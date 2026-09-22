const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [700,750,800,850,900,950,1000,1024,1050,1100]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    const header = await page.$('header');
    const headerBox = await header.boundingBox();
    console.log(width, 'header height', headerBox.height);
    await page.close();
  }
  await browser.close();
})();
