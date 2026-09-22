const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [320,340,360,375,390,400,420,440,460,480,500,520,540,560,580,600,620,640]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
    const h1 = await page.$('h1');
    const lines = await h1.evaluate(el => el.getClientRects().length);
    const header = await page.$('header');
    const headerBox = await header.boundingBox();
    const wrap = await page.$('.arc-reactor-wrap');
    const wrapBox = await wrap.boundingBox();
    await page.mouse.move(wrapBox.x + wrapBox.width/2, wrapBox.y + wrapBox.height/2);
    await page.waitForTimeout(300);
    const holo = await page.$('.hologram');
    const holoBox = await holo.boundingBox();
    const overlap = holoBox.y < headerBox.height;
    console.log(width, 'h1lines', lines, 'headerH', headerBox.height.toFixed(1), 'wrapY', wrapBox.y.toFixed(1), 'holoY', holoBox.y.toFixed(1), 'holoBottom', (holoBox.y+holoBox.height).toFixed(1), 'OVERLAP', overlap);
    await page.close();
  }
  await browser.close();
})();
