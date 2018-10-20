module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    let arr = message.split(" ");
    let num = arr[1];

    let embededImage = new Discord.RichEmbed()
        .setImage("/arabDirectory/%s", num) //get corresponding image from directory
    
    message.channel.send({embededImage: embededImage}) //send it yo
}
module.exports.help = {
    name: "arabspring"
}	