const { Router } = require("express"),
  getToken = require("../../utils/getToken"),
  getUser = require("../../utils/getUser"),
  router = Router()
router.get("/", async (req, res) => {
  let { code } = req.query;
  if (!code) return res.sendStatus(403);
  let token = await getToken(code);
  if (!token) return res.sendStatus(403);
  res.cookie("token", token.access_token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12 * 5),
  });
  
  res.redirect("/");
});

module.exports = router;
