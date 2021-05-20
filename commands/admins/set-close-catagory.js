const Guild = require("../../config/guild");
module.exports = {
  name: "set-close",

  run: async (client, message, args, system) => {
    Guild.findOne({
      guildID: message.guild.id,
    }, (err, guild) => {
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Do not have the surrounding environment permissions.")
      let channel = args[0]
      if (!channel) return message.channel.send("You have to type the id of category")
      let category = message.guild.channels.cache.find(c => c.id == args[0] && c.type == "category")
      if (!category) return message.channel.send("Sorry, i can't find this category, Pls check the id and try again")
      guild.close_catagory = category.id
      guild.save()
      message.channel.send(`${category.name} has been set for closed tickets category`)
    })
  },
};
