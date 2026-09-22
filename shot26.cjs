const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
  const h1 = await page.$('h1');
  const box = await h1.boundingBox();
  await page.screenshot({ path: '/tmp/h1_zoom.png', clip: {x: box.x-20, y: box.y-20, width: box.width+40, height: box.height+40} });
  await browser.close();
})();
