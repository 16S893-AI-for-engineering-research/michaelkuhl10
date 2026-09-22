const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });
  await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
  const h1 = await page.$('h1');
  const info = await h1.evaluate(el => {
    return { html: el.outerHTML, rect: el.getBoundingClientRect() };
  });
  console.log(JSON.stringify(info, null, 2));
  await page.screenshot({ path: '/tmp/h1_320.png' });
  await browser.close();
})();
