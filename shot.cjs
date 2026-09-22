const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  const wrap = await page.$('.arc-reactor-wrap');
  const box = await wrap.boundingBox();
  console.log('wrap box', box);
  await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/home_full.png' });
  const holo = await page.$('.hologram');
  console.log('holo box', await holo.boundingBox());
  const header = await page.$('header');
  console.log('header box', await header.boundingBox());
  await browser.close();
})();
