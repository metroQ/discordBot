//Punish command, use on liam
module.exports.run = async (bot, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't punish you wanna-be.");

		let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
		if(!toMute) return message.channel.send("You didn't specify a target.");

		if(toMute.id == message.author.id) return message.channel.send("You cannot mute yourself.");
		if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute a superior.");

		let role = message.guild.roles.find(r => r.name == "Currently Punished");
		if(!role) {
			try{
				role = await message.guild.createRole({
					name: "Currently Punished",
					color: "#000000",
					permission: []

				});

				message.guild.channels.forEach(async (channel, id) =>{
					await chananel.overwritePermissions(role, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					});
				});
			} catch(e) {
				console.log(e.stack);
			}
		}

		if(toMute.roles.has(role.id)) return message.channel.send("This homie is already being dabbed on atm.");

		await toMute.addRole(role);
		message.channel.send("Dabbing on them now.");
}

module.exports.help = {
	name: "punish"
}