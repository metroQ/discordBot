/*const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    let newMes = message.toString(); //make the discord message a string
    let arr = newMes.split(" "); 
    let num = arr[1];

    let embed = new Discord.RichEmbed()
        .attachFile("./arabDirectory/%s", num);
    	
    message.channel.send({embed: embed}) //send it yo
}
module.exports.help = {
    name: "arabspring"
}	