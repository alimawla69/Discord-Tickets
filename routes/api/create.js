const Discord = require("discord.js");
const express = require("express");
const router = express.Router(),
  getUser = require("../../utils/getUser"),
  Guild = require("../../config/guild"),
  client = require("../../discordclient"),
  config = require("../../config/main")
router.get("/", (req, res) => {
  let guild = client.guilds.cache.get(config.guildID)
  if (!guild) return res.redirect("/discord")

  let userID = req.query.userID
  if (!userID) return res.redirect("/api/login")
  if (!guild.members.cache.get(userID)) return res.redirect("/discord")
  let typeID = req.query.type
  if (!typeID) return res.redirect("/")
  Guild.findOne({
    guildID: guild.id,
  }, (err, dataguild) => {
    let type = dataguild.types.find(r => r.ID == typeID)
    if (!type) return res.redirect("/discord")
    guild.channels
      .create(`${type.type}-${dataguild.number + 1}`, { type: "text" })
      .then(async ticket => {
        let invite = await ticket.createInvite({
          maxAge: 0, // 0 = infinite expiration
          maxUses: 0 // 0 = infinite uses
        }).catch(console.error);
        res.send({ url: invite.url })
        let r = dataguild.role
        if (r !== "") {
          guild.roles.cache.get(r) ? ticket.overwritePermissions([{
            id: guild.roles.cache.get(r),
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          }]
          ) : false

        }
        ticket.overwritePermissions([{
          id: guild.id,
          false: ["VIEW_CHANNEL", "SEND_MESSAGES"]
        }]
        );
        ticket.overwritePermissions([{
          id: userID,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
        }]
        );
        if (type.catagory !== false) {
          let category = guild.channels.cache.find(c => c.id == type.catagory && c.type == "category")
          if (category && ticket) ticket.setParent(category.id);
        }
        let user = client.users.cache.get(userID)
        if (!user) user = {
          id: userID,
          username: "Unknown",
          discriminator: "#0000",
        }
        let embed = new Discord.MessageEmbed()
          .addField("Ticket Creator", user,true)
          .addField("Ticket Number", dataguild.number + 1,true)
          .addField("Support Message", '```css\n' + 'نرجو منك ارسال الطلب الخاص بك هنا' + '```')
          .setAuthor(user.username, user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
          .setTimestamp().setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
          if (guild.roles.cache.get(r)) {
          ticket.send(`${guild.roles.cache.get(r)}`, { embed: embed })

        } else ticket.send(embed)
        let data = {
          owner: userID,
          channel: ticket.id,
          type: type.ID
        }
        dataguild.channels.push(data)
        dataguild.number = dataguild.number + parseInt(1)
        dataguild.markModified("channels")
        dataguild.save()

        let log = guild.log
        let echannel = client.channels.cache.get(log)
        if (echannel && message.guild.me.permissionsIn(echannel).has("VIEW_CHANNEL") && message.guild.me.permissionsIn(echannel).has("EMBED_LINKS") && message.guild.me.permissionsIn(echannel).has("SEND_MESSAGES")) {
          try {
            const webhooks = await echannel.fetchWebhooks();
            const hook = webhooks.first();
            let embed = new Discord.MessageEmbed()
              .setTitle(`New ticket created`)
              .setDescription(`The user (${user}) has created ticket <#${ticket.id}>`)
              .setTimestamp().setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
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
})

module.exports = router;
