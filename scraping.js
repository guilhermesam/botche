const puppeteer = require("puppeteer")


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function scrapper() {

        const url = `https://www.alegretetudo.com.br/categoria/policia/page/${getRandomInt(1, 120)}`;
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url, {waitUntil: 'networkidle2'})
    
        const data = await page.evaluate(() => {
            const titleArray = document.querySelectorAll('main > div > article header h3');
            const dateArray = document.querySelector('main > div > article header div a time').innerText
            const random = Math.floor(Math.random() * titleArray.length);
            const report = titleArray[random].innerText + " - " + dateArray;
            return report;
        })
    
        browser.close()
        return data
}

module.exports = scrapper;