const botSettings = require("./botsettings.json")
const Discord = require(`discord.js`);
const bot = new Discord.Client();

bot.on("ready", () =>{
    console.log(`${bot.user.username} up and running...`)
});
bot.login(botSettings.token);