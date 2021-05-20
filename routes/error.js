const { Router } = require("express"),
  router = Router(),
  getUser = require("../utils/getUser")
router.get("/", async (req, res) => {
  let user = await getUser(req.cookies["token"]);
  res.render("error", {
    pageName: "Error ",
    user,

  });
});

module.exports = router;
