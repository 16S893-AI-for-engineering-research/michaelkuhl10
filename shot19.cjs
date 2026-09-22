const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [320,340,360,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800]) {
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
