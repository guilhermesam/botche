const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const moment = require("moment")
const puppeteer = require("puppeteer")


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let scrape = async() => {

    const url = `https://www.alegretetudo.com.br/categoria/policia/page/${getRandomInt(1, 120)}`;
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: 'networkidle2'})

    const data = await page.evaluate(() => {
        const titleArray = document.querySelectorAll('main > div > article header h3')
        const title = titleArray[Math.floor(Math.random() * titleArray.length)].innerText
        return title
    })

    browser.close()
    return data
}

client.on("ready", () => {
  console.log(`O bot foi iniciado, com ${client.users.cache.size} usuários em ${client.guilds.cache.size} servidores.`);
  client.user.setActivity('Melhores do Porca Veia', { type: 'LISTENING' });(`Eu estou em ${client.guilds.cache.size} servidores`);
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const m = await message.channel.send(`:ping_pong: Pong! A latência é de ${Math.round(client.ws.ping)}ms`)
    }

    else if (command === "porca") {
        const now = moment(new Date()); 
        const past = moment("2020-06-15");
        const duration = moment.duration(now.diff(past)); 

        const m = await message.channel.send(`Estamos há ${Math.round(duration.asDays())} dias sem Porca Veia :pensive:`)
    }

    else if (command === "alegretetudo") {
        scrape().then((value) => {
            const m = message.channel.send(value)
        })
    }
});

client.login(config.token);