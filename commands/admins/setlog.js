const Guild = require("./../../config/guild");
module.exports = {
  name: "setlog",

  run: async (client, message, args, system) => {
    Guild.findOne({
      guildID: message.guild.id,
    }, (err, guild) => {
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Do not have the surrounding environment permissions.")
      let channel = message.mentions.channels.first()
      if (!channel) return message.channel.send("Please mention a channel")
      if (!message.guild.channels.cache.find(c => c == channel)) return message.channel.send("I can't find this channel")
      guild.log = channel.id
      guild.save()
      message.channel.send(`#${channel.name} has been set for logs channel`)
    })
  },
};
