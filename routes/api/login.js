const { Router } = require("express"),
  getUser = require("../../utils/getUser"),
  router = Router();

router.get("/", async (req, res) => {
  let user = await getUser(req.cookies["token"]);
  if (user) return res.redirect("/");
  let redirect = process.env.CALLBACK_URI;
  let url = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=guilds%20identify`;
  res.redirect(url);
});

module.exports = router;
