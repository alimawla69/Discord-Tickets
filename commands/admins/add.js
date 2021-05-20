const config = require("./../../config/main");
const Guild = require("./../../config/guild");
const Discord = require("discord.js")
module.exports = {
    name: "add",
    run: async (client, message, args) => {
        Guild.findOne({
            guildID: message.guild.id,
        }, (err, guild) => {
            if (message.author.id !== message.guild.ownerID && message.guild.roles.cache.get(guild.role)) {
                if (!message.member.roles.has(guild.role)) return message.channel.send("You don't have support role!")
            } else if (message.author.id !== message.guild.ownerID) return
            let user =
                message.mentions.users.first() || message.guild.members.cache.get(args[0])
            if (!user) return message.channel.send("Please mention someone!")
            if (!message.guild.members.cache.find(r => r === user)) return message.channel.send("I can't find this user.")

            if (
                !message.guild
                    .member(client.user)
                    .permissions.has(["MANAGE_CHANNELS", "MANAGE_ROLES"])
            )
            return message.channel.send("I don't have **`MANAGE_CHANNELS`** Permissions!");

   
            if (!guild.channels.find(c => c.channel == message.channel.id))
                return message.channel.send("This is not a ticket channel");
            message.channel
                .createOverwrite(user.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                })
                .then(async() => {
                    message.channel.send(`${user} added to ticket ${message.channel}`);
                    let log = guild.log
                    let echannel = client.channels.cache.get(log)
                    if (echannel && message.guild.me.permissionsIn(echannel).has("VIEW_CHANNEL") && message.guild.me.permissionsIn(echannel).has("EMBED_LINKS") && message.guild.me.permissionsIn(echannel).has("SEND_MESSAGES")) {
                      try {
                        const webhooks = await echannel.fetchWebhooks();
                        const hook = webhooks.first();
                        let embed = new Discord.MessageEmbed()
                          .setTitle(`New user added to ticket`)
                          .setDescription(`The user (${user}) has been added to ticket <#${message.channel.id}> by ${message.author}`)
                          .setTimestamp().setThumbnail(user.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
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
