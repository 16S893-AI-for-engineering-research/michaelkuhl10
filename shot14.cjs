const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [320,360,400,450,500,550,600,650,700,750]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
    const h1 = await page.$('h1');
    const info = await h1.evaluate(el => {
      const cs = getComputedStyle(el);
      return { fontSize: cs.fontSize, lines: el.getClientRects().length, width: el.getBoundingClientRect().width };
    });
    console.log(width, info);
    await page.close();
  }
  await browser.close();
})();
