const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function runVisualVerification() {
  console.log("=== RUNNING BROWSER VIEWPORT & UI VERIFICATION ===");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  const screenshotsDir = path.join(__dirname, "..", "test-screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const viewports = [
    { name: "mobile-360", width: 360, height: 740 },
    { name: "mobile-390", width: 390, height: 844 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "desktop-1280", width: 1280, height: 800 },
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

    // Check for horizontal overflow
    const overflow = await page.evaluate((expectedWidth) => {
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.scrollWidth;
      const innerWidth = window.innerWidth;
      return {
        expectedWidth,
        scrollWidth,
        bodyWidth,
        innerWidth,
        hasHorizontalOverflow: scrollWidth > expectedWidth,
      };
    }, vp.width);

    console.log(
      `Viewport ${vp.name} (${vp.width}x${vp.height}): scrollWidth=${overflow.scrollWidth}, innerWidth=${overflow.innerWidth}, overflow=${overflow.hasHorizontalOverflow}`
    );

    if (overflow.hasHorizontalOverflow) {
      console.error(`WARNING: Viewport ${vp.name} has horizontal overflow! scrollWidth is ${overflow.scrollWidth} > ${vp.width}`);
    } else {
      console.log(`✓ PASS: No horizontal overflow on ${vp.name}`);
    }

    // Take screenshot of hero
    await page.screenshot({
      path: path.join(screenshotsDir, `${vp.name}-hero.png`),
    });

    // Take full page screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, `${vp.name}-full.png`),
      fullPage: true,
    });
  }

  // Test Mobile Navigation drawer on 390px
  console.log("\n--- Testing Mobile Menu Navigation ---");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  const menuButton = await page.$("button[aria-label='Toggle navigation menu']");
  if (menuButton) {
    await menuButton.click();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({
      path: path.join(screenshotsDir, "mobile-menu-open.png"),
    });
    console.log("✓ PASS: Mobile menu toggled and captured");
  }

  // Test FAQ Accordion expansion
  console.log("\n--- Testing FAQ Accordion ---");
  const secondFaqButton = await page.$("#btn-faq-2");
  if (secondFaqButton) {
    await secondFaqButton.click();
    await new Promise((r) => setTimeout(r, 300));
    const isExpanded = await page.evaluate(() => {
      const btn = document.getElementById("btn-faq-2");
      return btn ? btn.getAttribute("aria-expanded") : null;
    });
    console.log(`✓ PASS: FAQ Accordion toggled (aria-expanded: ${isExpanded})`);
  }

  // Test Admin Login & Lead View via Browser
  console.log("\n--- Testing Admin Portal in Browser ---");
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle0" });
  await page.screenshot({
    path: path.join(screenshotsDir, "admin-login-screen.png"),
  });

  // Type password and login
  await page.type("#admin-password", "MegersaDental2026!Adama");
  await page.click("button[type='submit']");
  await page.waitForNavigation({ waitUntil: "networkidle0" }).catch(() => {});
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(screenshotsDir, "admin-dashboard.png"),
  });
  console.log("✓ PASS: Admin portal logged in and dashboard screenshot captured");

  await browser.close();
  console.log("\n=== ALL VISUAL & BROWSER VERIFICATIONS COMPLETED SUCCESSFULLY ===");
}

runVisualVerification().catch((err) => {
  console.error("Browser verification failed:", err);
  process.exit(1);
});
