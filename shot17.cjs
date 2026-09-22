const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const failed = [];
  page.on('requestfailed', req => failed.push(req.url()));
  await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
  console.log('failed requests', failed);
  const h1 = await page.$('h1');
  const font = await h1.evaluate(el => getComputedStyle(el).fontFamily);
  console.log('h1 font', font);
  await browser.close();
})();
