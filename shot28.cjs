const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [1280,1300,1320,1350,1366,1380,1400,1420,1440,1460,1480,1500,1512,1536,1600,1700,1800,1900,1920]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
    const lines = await page.evaluate(() => {
      const el = document.querySelector('h1');
      const range = document.createRange();
      range.selectNodeContents(el);
      return range.getClientRects().length;
    });
    console.log(width, 'lines', lines);
    await page.close();
  }
  await browser.close();
})();
