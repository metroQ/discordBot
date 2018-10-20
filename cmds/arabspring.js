module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    let chars = message.split();
    let imageNumber = chars[12];

    let embededImage = new Discord.RichEmbed()
        .setImage("/images/%s", imageNumber) //get corresponding image from directory
    
    message.channel.send({embededImage: embededImage}) //send it yo
}
module.exports.help = {
    name: "randomimag"
}	