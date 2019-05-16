const puppeteer = require('puppeteer');

describe('cs-options', () => {

    let browser = null;
    let page = null;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 80,
            args: ['--window-size=1920,1080']
        });
        page = await browser.newPage();
        await page.goto('file:///C:/Users/przem/Desktop/projects/custom-select/index.html');
    });

    it('should have active class when placeholder was clicked', async () => {

        await page.click('#test .cs-placeholder');
        const hasActiveClass = await page.$eval('#test .cs-options', el => el.classList.contains('active'));
        expect(hasActiveClass).toBeTruthy();

    });

    it('should have not active class when backdrop has been clicked', async () => {

        await page.click('#test .cs-placeholder');
        await page.click('#test .cs-backdrop');
        const hasActiveClass = await page.$eval('#test .cs-options', el => el.classList.contains('active'));
        expect(hasActiveClass).toBeFalsy();

    });

});
