const Discord = module.require("discord.js");
//yunus ur cute love urself
module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("User info")
        .setColor("#FFFFFF")
        .addField("Full Username", message.author.tag)
        .addField("ID", message.author.id)
        .addField("Created At", message.author.createdAt)
    
    message.channel.send({embed: embed})
}

module.exports.help = {
    name: "userinfo"
}