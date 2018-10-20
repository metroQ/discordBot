const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    
    let embed = new Discord.RichEmbed()
        .setAuthor(target.username, target.displayAvatarURL)
        .setColor("#B83B20")
        .setImage("https://i.imgur.com/fvHuMbn.png")
        .setThumbnail("https://i.imgur.com/wiWxBQd.png")
        .setFooter("<-This Bot is Powered by this Rat", "http://www.animateit.net/data/media/129/302_hamster_running_wheel_hg_clr.gif")
        .setTimestamp()
        .addField("User's Username:", `${target.username}#${target.discriminator}`)
        .addField("User ID:", target.id)
        .addField("User Created On:", target.createdAt)
    
    message.channel.send({embed: embed})
}

module.exports.help = {
    name: "userinfo"
}