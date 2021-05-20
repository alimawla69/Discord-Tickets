const { Router } = require("express"),
  router = Router();

router.get("/", async (req, res) => {
  req.cookies["token"] ? res.clearCookie("token") : null;
  res.redirect("/");
});

module.exports = router;
