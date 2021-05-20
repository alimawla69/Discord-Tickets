const { Router } = require("express"),
  router = Router();

router.use("/login", require("./login"));
router.use("/callback", require("./callback"));
router.use("/logout", require("./logout"));
router.use("/create", require("./create"));
module.exports = router;
