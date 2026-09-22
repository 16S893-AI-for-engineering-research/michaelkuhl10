const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [800,820,840,850,860,870,880,900,950,1000,1024,1100,1200,1280]) {
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
