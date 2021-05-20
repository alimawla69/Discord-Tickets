const Guild = require("./../../config/guild");
const shortid = require("shortid");
module.exports = {
    name: "settype",
    run: async (client, message, args, system) => {
        Guild.findOne({
            guildID: message.guild.id,
        }, (err, guild) => {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Do not have the surrounding environment permissions.")
            message.channel.sen(`Please type the support type`).then(msg1 => {
                message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] }).then(collected1 => {
                    if(guild.types.find(r => r.type == collected1.first().content)) return message.channel.send("Thi type is arleady added")
                    if (message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
                        collected1.first().delete()
                        msg1.delete()
                    }
                    message.channel.send("Please type category or type anything to disable catagory").then(msg2 => {
                        message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] }).then(collected2 => {
                            let category = message.guild.channels.cache.find(c => c.id == collected2.first().content && c.type == "category")
                            if (!category) category = ""
                            if (message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
                                collected2.first().delete()
                                msg2.delete()
                            }
                            let ID = shortid.generate()
                            message.channel.send(`Type with (ID: ${ID}) has been added to support types`)
                            let data = {
                                type: collected1.first().content,
                                catagory: collected2.first().content,
                                ID: ID
                            }
                            guild.types.push(data)
                            guild.save()
                        })
                            .catch(collected => {
                                return msg2.delete()
                            });
                    })
                })
                    .catch(collected => {
                        return msg1.delete()
                    });
            });
        })
    },
};
