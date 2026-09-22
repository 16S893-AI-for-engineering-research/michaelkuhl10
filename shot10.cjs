const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const vp of [{w:1512,h:857},{w:1440,h:816},{w:1280,h:720},{w:1920,h:1080},{w:1600,h:900}]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    await page.goto('https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/', { waitUntil: 'networkidle' });
    const h1 = await page.$('h1');
    const lines = await h1.evaluate(el => el.getClientRects().length);
    const header = await page.$('header');
    const headerBox = await header.boundingBox();
    const wrap = await page.$('.arc-reactor-wrap');
    const wrapBox = await wrap.boundingBox();
    await page.mouse.move(wrapBox.x + wrapBox.width/2, wrapBox.y + wrapBox.height/2);
    await page.waitForTimeout(400);
    const holo = await page.$('.hologram');
    const holoBox = await holo.boundingBox();
    console.log(vp, 'h1lines', lines, 'header', headerBox, 'wrap', wrapBox, 'holo', holoBox);
    await page.screenshot({ path: `/tmp/live_${vp.w}x${vp.h}.png` });
    await page.close();
  }
  await browser.close();
})();
