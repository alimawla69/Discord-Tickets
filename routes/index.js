
const { Router } = require("express"),
  getUser = require("../utils/getUser"),
  client = require("../discordclient"),
  router = Router(),
  config = require("../config/main"),
  Guild = require("../config/guild")

router.use("/api", require("./api/index"));

router.use("/discord", require("./discord"));
router.use("/error", require("./error"));

router.get("/", async (req, res) => {
  let user = await getUser(req.cookies["token"]);

  if (!user) user = false
  let guild = client.guilds.cache.get(config.guildID)
  if (!guild) return res.send({ message: "guildID in /config/main.js requared to run this website" })
  Guild.findOne({
    guildID: guild.id,
  }, (err, g) => {
    if (!g) {
      let newg = new Guild({ guildID: guild.id })
      newg.save().catch(err => console.error(err))
      res.send({ message: "Please refresh this page database is setuping" })
      return
    } else {
      res.render("index", {
        pageName: "Home",
        user,
        avatar: user
          ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"
          }`
          : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 5)}.png`,
        guild,
        guildData: g ? g : false
      });
    }
  })

});

module.exports = router;
