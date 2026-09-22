const { webkit } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await webkit.launch();
  for (const width of [1280,1440,1512,1024]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
    const h1 = await page.$('h1');
    const lines = await h1.evaluate(el => el.getClientRects().length);
    const wrap = await page.$('.arc-reactor-wrap');
    const wrapBox = await wrap.boundingBox();
    await page.mouse.move(wrapBox.x + wrapBox.width/2, wrapBox.y + wrapBox.height/2);
    await page.waitForTimeout(300);
    const holo = await page.$('.hologram');
    const holoBox = await holo.boundingBox();
    const header = await page.$('header');
    const headerBox = await header.boundingBox();
    console.log(width, 'lines', lines, 'wrapY', wrapBox.y.toFixed(1), 'holoY', holoBox?.y?.toFixed(1), 'headerH', headerBox.height.toFixed(1));
    await page.screenshot({ path: `/tmp/webkit_${width}.png` });
    await page.close();
  }
  await browser.close();
})();
