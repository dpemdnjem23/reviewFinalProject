const router = require("express").Router();
const controller = require("../controllers/map");

router.post("/register", controller.mapRegisterControl);
router.get("/info", controller.mapInfoControl);

module.exports = router;
