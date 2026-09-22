const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [375, 400, 480, 540, 600, 640, 700]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    const header = await page.$('header');
    const headerBox = await header.boundingBox();
    const nav = await page.$('nav');
    const navBox = await nav.boundingBox();
    const wrap = await page.$('.arc-reactor-wrap');
    const wrapBox = await wrap.boundingBox();
    console.log(width, 'header', headerBox, 'nav', navBox, 'wrap', wrapBox);
    await page.mouse.move(wrapBox.x+wrapBox.width/2, wrapBox.y+wrapBox.height/2);
    await page.waitForTimeout(400);
    const holo = await page.$('.hologram');
    const holoBox = await holo.boundingBox();
    console.log('  holo', holoBox);
    await page.screenshot({ path: `/tmp/nav2_${width}.png` });
    await page.close();
  }
  await browser.close();
})();
