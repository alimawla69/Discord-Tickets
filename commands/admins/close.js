const config = require("../../config/main");
const Guild = require("../../config/guild");
const Discord = require("discord.js")
module.exports = {
  name: "close",

  run: async (client, message, args, system) => {
    Guild.findOne({
      guildID: message.guild.id,
    }, (err, guild) => {
      if (message.author.id !== message.guild.ownerID && message.guild.roles.cache.get(guild.role)) {
        if (!message.member.roles.has(guild.role)) return message.channel.send("You don't have support role!")
      } else if (message.author.id !== message.guild.ownerID) return



      if (
        !message.guild
          .member(client.user)
          .permissions.has(["MANAGE_CHANNELS", "MANAGE_ROLES"])
      )
        return message.channel.send("I don't have **`MANAGE_CHANNELS`** Permissions!");


      if (!guild.channels.find(c => c.channel == message.channel.id))
        return message.channel.send("This is not a ticket channel");

      message.channel
        .createOverwrite(message.author.id, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false
        })
        .then(async () => {
          if (guild.close_catagory !== "") {
            let category = message.guild.channels.cache.find(c => c.id == guild.close_catagory && c.type == "category")
            if (category && message.channel) message.channel.setParent(category.id);
          }
          message.channel.send(`Ticket Closed by ${message.author}`)

          guild.channels = guild.channels.filter(r => r.channel !== message.channel.id)
          guild.save()
          let log = guild.log
          let echannel = client.channels.cache.get(log)
          if (echannel && message.guild.me.permissionsIn(echannel).has("VIEW_CHANNEL") && message.guild.me.permissionsIn(echannel).has("EMBED_LINKS") && message.guild.me.permissionsIn(echannel).has("SEND_MESSAGES")) {
            try {
              const webhooks = await echannel.fetchWebhooks();
              const hook = webhooks.first();
              let embed = new Discord.MessageEmbed()
                .setTitle(`New ticket has been closed`)
                .setDescription(`The ticket <#${message.channel.id}> has been closed by ${message.author}`)
                .setTimestamp().setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
              if (hook) {
                await hook.send({
                  username: client.user.username,
                  avatarURL: client.user.displayAvatarURL(),
                  embeds: [embed],
                });
              } else if (!hook) {
                echannel.createWebhook(client.user.username, { avatar: client.user.displayAvatarURL() }).then(async hook => {
                  await hook.send(embed)
                })

              }
            } catch (err) {
              console.log(err)
            }
          } else { return } // docs
        })

    })
  },
};
