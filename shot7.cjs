const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  const h1 = await page.$('h1');
  const box = await h1.boundingBox();
  console.log('h1 box', box);
  const text = await h1.evaluate(el => el.textContent);
  console.log('text', text);
  const lines = await h1.evaluate(el => {
    const rects = Array.from(el.getClientRects());
    return rects.length;
  });
  console.log('rendered lines', lines);
  await browser.close();
})();
