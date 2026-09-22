const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [768, 820, 900, 1000, 1024]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    const header = await page.$('header');
    const headerBox = await header.boundingBox();
    const nav = await page.$('nav');
    const navBox = await nav.boundingBox();
    console.log(width, 'header', headerBox, 'nav', navBox);
    await page.screenshot({ path: `/tmp/nav_${width}.png` });
    await page.close();
  }
  await browser.close();
})();
