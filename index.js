const botSettings = require("./botsettings.json")
const Discord = require(`discord.js`);
const fs = require("fs");
const mysql = require("mysql");

const prefix = botSettings.prefix;

const bot = new Discord.Client();

bot.commands = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load...");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands...`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded...`);
        bot.commands.set(props.help.name, props);
    });
});
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "xppoints"
});

con.connect(err => {
    if(err) throw err;
    console.log("Connection to database successful.");
})
bot.on("ready", () =>{
    console.log(`${bot.user.username} up and running...`);
    console.log(bot.commands);
});

function generatePoints(){
    let min = 1
    let max = 10

    return Math.floor(Math.random() * (max - min + 1)) + min;

}
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    con.query(`SELECT * FROM xppoints WHERE id = '${message.author.id}'`, (err, rows) =>{ //get points from database
        if(err) throw err;

        let sql;

        if(rows.length < 1) {
            sql = `INSERT INTO points (id, points) VALUES ('${message.author.id}', ${generatePoints()})`
        } else { //previous points found
            let points = rows[0].points;

            sql  = `UPDATE points SET points = ${points + generatePoints()} WHERE id = '${message.author.id}'`;
        }
        con.query(sql, console.log);
    });

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
});

bot.login(botSettings.token);