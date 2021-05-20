require("dotenv").config();
const Discord = require("discord.js");
const { Client } = require("discord.js");
const client = new Client(),
  fs = require("fs"),
  prefix = process.env.PREFIX,
  { guildID } = require("./config/main"),
  Guild = require("./config/guild"),
  { connect, connection } = require("mongoose");

connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

connection.once("open", () =>
  console.log(`Successfully connected to the database.`)
);
connection.on("error", console.error.bind(console, `[ERROR] : `));
client.commands = new Discord.Collection();
client.categories = fs.readdirSync("./commands");

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
client.on("ready", () => {
  client.user.setPresence({
    activity: {
      name: prefix + "help  ",
    },
  });
  console.log(`Discord client is ready!`);
});
setInterval(() => {
  client.guilds.cache.forEach(d => {
    Guild.findOne({
      guildID: d.id,
    }, (err, guild) => {
      if (guild) {
        guild.channels.map(r => {

          if (!d.channels.cache.get(r.channel)) {
            guild.channels = guild.channels.filter(r => r.channel !== r.channel)
            guild.save()
          }

        });
      }
    })
  })
}, 5000);
client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.channel.type == "dm") return;
  Guild.findOne({
    guildID: message.guild.id,
  }, (err, guild) => {
    if (!guild && message.guild.id ===process.env.GUILDID) {
      let newg = new Guild({ guildID: message.guild.id })
      newg.save().catch(err => console.error(err))
    } else {
      if (message.content.startsWith(prefix)) {

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        if (command) {
          command.run(client, message, args);
        }
      }
    }
  })

});
client.on("channelDelete", async channel => {
  channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    // find the log entry for this specific channel
    .then(logs =>
      logs.entries.find(entry => entry.target.id == channel.id)
    )
    .then(async entry => {
      Guild.findOne({
        guildID: channel.guild.id,
      }, async (err, guild) => {
        if (!guild && channel.guild.id === guildID) {
          let newg = new Guild({ guildID: channel.guild.id })
          newg.save().catch(err => console.error(err))
        } else {
          if (guild.close_catagory === channel.id) {
            guild.close_catagory = ""
            guild.save()
          }
          if (guild.channels.find(r => r.channel == channel.id)) {
            guild.channels = guild.channels.filter(r => r.channel !== channel.id)
            guild.save()

            let log = guildData.log
            let echannel = client.channels.cache.get(log)
            if (echannel && guild.me.permissionsIn(echannel).has("VIEW_CHANNEL") && guild.me.permissionsIn(echannel).has("EMBED_LINKS") && guild.me.permissionsIn(echannel).has("SEND_MESSAGES")) {
              try {
                const webhooks = await echannel.fetchWebhooks();
                const hook = webhooks.first();
                let embed = new Discord.MessageEmbed()
                  .setTitle(`New ticket deleted`)
                  .setDescription(`The user (${entry.executor}) has delete #${channel.id}`)
                  .setTimestamp().setThumbnail(entry.executor.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
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
          }
        }
      })
    })
})
client.login(process.env.BOT_TOKEN);
module.exports = client;
