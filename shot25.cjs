const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
  const wrap = await page.$('.arc-reactor-wrap');
  const box = await wrap.boundingBox();
  await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/zoom_hover.png', clip: {x: box.x-50, y: box.y-30, width: 500, height: 220} });
  await browser.close();
})();
