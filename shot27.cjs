const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const el = document.querySelector('h1');
    const cs = getComputedStyle(el);
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = Array.from(range.getClientRects());
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, rects: rects.map(r=>({x:r.x,y:r.y,w:r.width,text: 'n/a'})) };
  });
  console.log(info);
  await browser.close();
})();
