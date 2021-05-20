const Guild = require("./../../config/guild");
module.exports = {
  name: "setrole",
 
  run: async (client, message, args, system) => {
    Guild.findOne({
      guildID: message.guild.id,
    }, (err, guild) => {
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Do not have the surrounding environment permissions.")
      let role = message.mentions.roles.first()
      if (!role) return message.channel.send("Please mention a role")
      if (!message.guild.roles.cache.find(c => c == role)) return message.channel.send("I can't find this role")
      guild.role = role.id
      guild.save()
      message.channel.send(`${role} has been set for support role`)
    })
  },
};
