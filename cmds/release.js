const Discord = module.require("discord.js");
module.exports.run =async (bot, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to release the target.");

	let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!toMute) return message.channel.send("You didn't specify a target.");

	let role = message.guild.roles.find(r => r.name == "Currently Punished");

	if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not being punished!");

	await toMute.removeRole(role);
	message.channel.send("They have been released")

}

module.exports.help = {
	name: "release"
}