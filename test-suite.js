const http = require("http");

async function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path,
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          let parsed = data;
          try {
            parsed = JSON.parse(data);
          } catch {}
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: parsed,
          });
        });
      }
    );
    req.on("error", reject);
    if (options.body) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("=== STARTING DR MEGERSA DENTAL CLINIC INTEGRATION TESTS ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Homepage loads
    const homeRes = await request("/");
    assert(homeRes.status === 200, "Homepage returns status 200");
    assert(
      typeof homeRes.data === "string" && homeRes.data.includes("Dr Megersa Dental Clinic"),
      "Homepage contains clinic title"
    );
    assert(
      typeof homeRes.data === "string" && homeRes.data.includes("A healthy smile starts with the right care"),
      "Homepage contains exact hero heading"
    );

    // 2. Images are served
    const img1 = await request("/images/dr-megersa.jpg");
    assert(img1.status === 200, "Doctor image (/images/dr-megersa.jpg) is accessible (200)");
    const img2 = await request("/images/clinic-reception.jpg");
    assert(img2.status === 200, "Reception image (/images/clinic-reception.jpg) is accessible (200)");
    const img3 = await request("/images/clinic-treatment.jpg");
    assert(img3.status === 200, "Treatment image (/images/clinic-treatment.jpg) is accessible (200)");

    // 3. Security Check: Unauthorized GET /api/leads must be 401
    const unauthLeads = await request("/api/leads");
    assert(unauthLeads.status === 401, "GET /api/leads without authentication returns 401 Unauthorized");

    // 4. Form Validation: Missing fields
    const invalidLead = await request("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { fullName: "", phone: "123", service: "" },
    });
    assert(invalidLead.status === 400, "POST /api/leads with empty fields is rejected (400)");

    // 5. Form Validation: Invalid phone number
    const badPhone = await request("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { fullName: "Abebe Kebede", phone: "abc-invalid", service: "Dental Check-up" },
    });
    assert(badPhone.status === 400, "POST /api/leads with invalid phone is rejected (400)");

    // 6. Valid Lead Submission (Ethiopian local format 0921...)
    const goodLead = await request("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        fullName: "Chaltu Dibaba",
        phone: "0921489071",
        telegramUsername: "@chaltu_d",
        service: "Teeth Cleaning",
        preferredDate: "2026-11-05",
      },
    });
    assert(goodLead.status === 200, "POST /api/leads with valid data succeeds (200)");
    assert(goodLead.data.success === true, "Lead response confirms success");
    assert(goodLead.data.lead && goodLead.data.lead.id.startsWith("lead_"), "Lead ID is generated");

    // 7. Admin Login: Wrong password fails
    const badLogin = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { password: "WrongPassword123!" },
    });
    assert(badLogin.status === 401, "Admin login with wrong password rejected (401)");

    // 8. Admin Login: Correct initial password
    const goodLogin = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { password: "MegersaDental2026!Adama" },
    });
    assert(goodLogin.status === 200, "Admin login with initial password succeeds (200)");
    
    // Extract session cookie
    const setCookie = goodLogin.headers["set-cookie"];
    assert(setCookie && setCookie.length > 0, "Session cookie header received");
    const sessionCookie = Array.isArray(setCookie) ? setCookie[0].split(";")[0] : setCookie.split(";")[0];
    assert(sessionCookie.includes("megersa_admin_session"), "HttpOnly session cookie is named megersa_admin_session");

    // 9. Admin Check Auth: returns true with cookie
    const authCheck = await request("/api/admin/check-auth", {
      headers: { Cookie: sessionCookie },
    });
    assert(authCheck.data.authenticated === true, "GET /api/admin/check-auth with session cookie returns authenticated: true");

    // 10. Admin View Leads: returns saved lead!
    const authLeads = await request("/api/leads", {
      headers: { Cookie: sessionCookie },
    });
    assert(authLeads.status === 200, "GET /api/leads with admin cookie succeeds (200)");
    assert(Array.isArray(authLeads.data.leads), "Leads is an array");
    const found = authLeads.data.leads.find((l) => l.fullName === "Chaltu Dibaba");
    assert(found !== undefined, "Submitted lead 'Chaltu Dibaba' found in persistent database");
    assert(found && found.phone === "+251921489071", "Phone normalized correctly to +251921489071");
    assert(found && found.telegramUsername === "chaltu_d", "Telegram username cleaned (@ removed)");
    assert(found && found.service === "Teeth Cleaning", "Requested service matches");
    assert(found && found.preferredDate === "2026-11-05", "Preferred date matches");

    // 11. Admin Password Change: Valid change
    const newPass = "NewSecureDentalPass2026!";
    const changeRes = await request("/api/admin/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: sessionCookie,
      },
      body: {
        currentPassword: "MegersaDental2026!Adama",
        newPassword: newPass,
        confirmPassword: newPass,
      },
    });
    assert(changeRes.status === 200, "POST /api/admin/change-password succeeds (200)");

    // 12. Verify old password no longer works
    const oldLoginTry = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { password: "MegersaDental2026!Adama" },
    });
    assert(oldLoginTry.status === 401, "Old password rejected after password change (401)");

    // 13. Verify new password works
    const newLoginTry = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { password: newPass },
    });
    assert(newLoginTry.status === 200, "New password logs in successfully (200)");

    // Revert password back to default for clean presentation
    const newCookie = Array.isArray(newLoginTry.headers["set-cookie"])
      ? newLoginTry.headers["set-cookie"][0].split(";")[0]
      : newLoginTry.headers["set-cookie"].split(";")[0];

    const revertRes = await request("/api/admin/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: newCookie,
      },
      body: {
        currentPassword: newPass,
        newPassword: "MegersaDental2026!Adama",
        confirmPassword: "MegersaDental2026!Adama",
      },
    });
    assert(revertRes.status === 200, "Reverted admin password to default for demo presentation");

    console.log(`\n=== TEST SUMMARY: ${passed} PASSED, ${failed} FAILED ===\n`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test runner error:", err);
    process.exit(1);
  }
}

runTests();
