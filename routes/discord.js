const { Router } = require("express"),
  router = Router();

router.get("/", (req, res) => res.redirect(require("../config").support));

module.exports = router;
