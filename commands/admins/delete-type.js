const config = require("./../../config/main");
const Guild = require("./../../config/guild");
const Discord = require("discord.js")
module.exports = {
    name: "delete-type",

    run: async (client, message, args) => {
        Guild.findOne({
            guildID: message.guild.id,
        }, async (err, guild) => {
            if (message.author.id !== message.guild.ownerID && message.guild.roles.cache.get(guild.role)) {
                if (!message.member.roles.has(guild.role)) return message.channel.send("لا تملك الصلاحيات الكافية")
            } else if (message.author.id !== message.guild.ownerID) return

            message.channel.send(`You have to type the support type`).then(async msg1 => {
                message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] }).then(async collected1 => {
                    let type = collected1.first().content
                    if (message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
                        collected1.first().delete()
                        msg1.delete()
                    }

                    if (!guild.types.find(r => r.type == type)) return message.channel.send("I can't find this type in my database, Pls check the name and try again")
                    guild.types = guild.types.filter(r => r.type !== type)
                    guild.save()
                    message.channel.send(`Type ${guild.types.find(r => r.type == type).ID} has been deleted by ${message.author}`)
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

                }).catch(() =>{
                    if (message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
                        collected1.first().delete()
                        msg1.delete()
                    }
                })
            })
        })
    },
};
