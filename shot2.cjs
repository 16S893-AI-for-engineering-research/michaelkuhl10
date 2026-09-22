const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [1024, 1152, 1280, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    const wrap = await page.$('.arc-reactor-wrap');
    const box = await wrap.boundingBox();
    await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
    await page.waitForTimeout(400);
    const holo = await page.$('.hologram');
    const holoBox = await holo.boundingBox();
    const header = await page.$('header');
    const headerBox = await header.boundingBox();
    console.log(width, 'wrap', box, 'holo', holoBox, 'header', headerBox);
    await page.screenshot({ path: `/tmp/home_${width}.png` });
    await page.close();
  }
  await browser.close();
})();
