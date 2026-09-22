const { chromium } = require('/Users/mikek/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4322/michaelkuhl10/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/top_section.png', clip: {x:0,y:0,width:1280,height:400} });
  await browser.close();
})();
