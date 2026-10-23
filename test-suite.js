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
  console.log("=== STARTING DR MEGERSA DENTAL CLINIC REDESIGN & SHOWCASE TESTS ===\n");
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
      typeof homeRes.data === "string" && homeRes.data.includes("A healthy smile starts with the"),
      "Homepage contains exact hero heading"
    );
    assert(
      typeof homeRes.data === "string" && homeRes.data.includes("Hakiima Ilkaan Keessanii"),
      "Homepage contains Afaan Oromo brand phrase"
    );
    assert(
      typeof homeRes.data === "string" && homeRes.data.includes("የ ጥርስዎ ሀኪም"),
      "Homepage contains Amharic brand phrase"
    );

    // 2. Images are served properly
    const heroImg = await request("/images/hero-dental-clinic.jpg");
    assert(heroImg.status === 200, "Sunlit modern dental hero image (/images/hero-dental-clinic.jpg) returns 200");
    const docImg = await request("/images/dr-megersa.jpg");
    assert(docImg.status === 200, "Real Dr Megersa portrait (/images/dr-megersa.jpg) returns 200");
    const recImg = await request("/images/clinic-reception.jpg");
    assert(recImg.status === 200, "Reception image (/images/clinic-reception.jpg) returns 200");
    const treatImg = await request("/images/clinic-treatment.jpg");
    assert(treatImg.status === 200, "Treatment image (/images/clinic-treatment.jpg) returns 200");

    // 3. Unauthorized access check
    const unauthLeads = await request("/api/leads");
    assert(unauthLeads.status === 401, "GET /api/leads without authentication returns 401 Unauthorized");

    // 4. Form validation: Empty fields rejected
    const invalidLead = await request("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { fullName: "", phone: "", service: "" },
    });
    assert(invalidLead.status === 400, "POST /api/leads with empty fields is rejected (400)");

    // 5. Form validation: Invalid phone rejected
    const badPhone = await request("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { fullName: "Abebe Kebede", phone: "invalid-phone", service: "Dental Check-up" },
    });
    assert(badPhone.status === 400, "POST /api/leads with invalid phone is rejected (400)");

    // 6. Valid lead validation and normalization
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
    assert(goodLead.data.success === true, "Lead validation confirms success");
    assert(goodLead.data.validatedData.phone === "+251921489071", "Phone normalized to +251921489071");
    assert(goodLead.data.validatedData.telegramUsername === "chaltu_d", "Telegram username cleaned (@ removed)");

    // 7. Admin Login: Wrong password rejected
    const badLogin = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { password: "WrongPassword999!" },
    });
    assert(badLogin.status === 401, "Admin login with wrong password rejected (401)");

    // 8. Admin Login: Correct initial password
    const goodLogin = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { password: "MegersaDental2026!Adama" },
    });
    assert(goodLogin.status === 200, "Admin login with initial password succeeds (200)");
    const setCookie = goodLogin.headers["set-cookie"];
    assert(setCookie && setCookie.length > 0, "Session cookie header received");
    const sessionCookie = Array.isArray(setCookie) ? setCookie[0].split(";")[0] : setCookie.split(";")[0];
    assert(sessionCookie.includes("megersa_admin_session"), "Cookie is named megersa_admin_session");

    // 9. Admin Login: Emergency recovery key
    const recoveryLogin = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { password: "MegersaRecovery2026!Adama" },
    });
    assert(recoveryLogin.status === 200, "Admin login with Emergency Recovery Key succeeds (200)");
    assert(recoveryLogin.data.isRecovery === true, "Response identifies recovery authentication");

    // 10. Check auth status
    const authCheck = await request("/api/admin/check-auth", {
      headers: { Cookie: sessionCookie },
    });
    assert(authCheck.data.authenticated === true, "GET /api/admin/check-auth returns authenticated: true");

    // 11. Password Change
    const newPass = "NewSecurePass2026!";
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

    // Verify old password fails
    const oldPassCheck = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { password: "MegersaDental2026!Adama" },
    });
    assert(oldPassCheck.status === 401, "Old password rejected after password change (401)");

    // Verify recovery key still works
    const recoveryStillWorks = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { password: "MegersaRecovery2026!Adama" },
    });
    assert(recoveryStillWorks.status === 200, "Recovery key still grants access after password change (200)");

    // Revert password
    const recoveryCookie = Array.isArray(recoveryStillWorks.headers["set-cookie"])
      ? recoveryStillWorks.headers["set-cookie"][0].split(";")[0]
      : recoveryStillWorks.headers["set-cookie"].split(";")[0];

    const revertRes = await request("/api/admin/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: recoveryCookie,
      },
      body: {
        currentPassword: "MegersaRecovery2026!Adama",
        newPassword: "MegersaDental2026!Adama",
        confirmPassword: "MegersaDental2026!Adama",
      },
    });
    assert(revertRes.status === 200, "Reverted password back to default for showcase presentation");

    console.log(`\n=== TEST SUMMARY: ${passed} PASSED, ${failed} FAILED ===\n`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exit(1);
  }
}

runTests();
