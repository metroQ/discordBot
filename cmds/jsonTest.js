const api = "https://jsonplaceholder.typicode.com/posts";
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args) =>{
    snekfetch.get(api).then(r => {
        let body = r.body;
        let id = Number(args[0]);

        if(!id) return message.channel.send("Supply json ID");
        if(isNaN(id)) return message.channel.send("That id is not a number");

        let entry = body.find(post => post.id === id); //find id in array that matches our entered id
        if(!entry) return message.channel.send("That entry does not exist."); 

        let embed = new Discord.RichEmbed()
        .setAuthor(entry.title)
        .setDescription(entry.body)
        .addField("Author ID", entry.userId)
        .setFooter("Post ID:" + entry.id);

        message.channel.send(RichEmbed);
    });

}
module.exports.help = {
    name: "jsonTest"
}