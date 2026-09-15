const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.log(`[pageerror] ${err.message}`);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  await page.evaluate(() => {
    const btn = document.querySelector('.nav[data-view="appearance"]');
    const rect = btn.getBoundingClientRect();
    console.log('rect:', rect.x, rect.y, rect.width, rect.height);
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const el = document.elementFromPoint(x, y);
    console.log('Button pointer-events:', window.getComputedStyle(btn).pointerEvents);
    console.log('Sidebar pointer-events:', window.getComputedStyle(btn.closest('.sidebar')).pointerEvents);
    console.log('Sidebar parent:', btn.closest('.sidebar').parentElement.tagName + '.' + btn.closest('.sidebar').parentElement.className);
    const workspace = document.querySelector('.workspace');
    const sidebar = document.querySelector('.sidebar');
    console.log('workspace rect:', JSON.stringify(workspace.getBoundingClientRect()));
    console.log('sidebar rect:', JSON.stringify(sidebar.getBoundingClientRect()));
    console.log('button rect:', JSON.stringify(btn.getBoundingClientRect()));
    console.log('btn visibility:', window.getComputedStyle(btn).visibility);
    console.log('btn opacity:', window.getComputedStyle(btn).opacity);
  });
  
  await new Promise(r => setTimeout(r, 500));
  await browser.close();
})();
