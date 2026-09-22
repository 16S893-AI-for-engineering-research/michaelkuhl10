const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [340,350,360,370,380,390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    const header = await page.$('header');
    const headerBox = await header.boundingBox();
    const wrap = await page.$('.arc-reactor-wrap');
    const wrapBox = await wrap.boundingBox();
    console.log(width, 'header height', headerBox.height, 'wrap y', wrapBox.y);
    await page.mouse.move(wrapBox.x+wrapBox.width/2, wrapBox.y+wrapBox.height/2);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `/tmp/narrow_${width}.png` });
    await page.close();
  }
  await browser.close();
})();
