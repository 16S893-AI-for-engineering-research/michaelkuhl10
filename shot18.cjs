const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });
  await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
  const h1 = await page.$('h1');
  const rects = await h1.evaluate(el => Array.from(el.getClientRects()).map(r => ({x:r.x,y:r.y,w:r.width,h:r.height})));
  console.log(rects);
  const range = await page.evaluate(() => {
    const el = document.querySelector('h1');
    const range = document.createRange();
    range.selectNodeContents(el);
    return Array.from(range.getClientRects()).map(r => ({x:r.x,y:r.y,w:r.width,h:r.height}));
  });
  console.log('range rects', range);
  await browser.close();
})();
