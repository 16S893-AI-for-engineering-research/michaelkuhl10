const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [768,800,850,900,950,1000,1024,1050,1080,1100,1150,1200,1250,1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
    const h1 = await page.$('h1');
    const lines = await h1.evaluate(el => el.getClientRects().length);
    console.log(width, 'lines', lines);
    await page.close();
  }
  await browser.close();
})();
