const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [1280, 1366, 1440, 1536, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    const h1 = await page.$('h1');
    const lines = await h1.evaluate(el => el.getClientRects().length);
    const box = await h1.boundingBox();
    const wrap = await page.$('.arc-reactor-wrap');
    const wrapBox = await wrap.boundingBox();
    console.log(width, 'h1 lines', lines, 'h1 box', box, 'wrap y', wrapBox.y);
    await page.close();
  }
  await browser.close();
})();
