const router = require("express").Router();
const controller = require("../controllers/image");
const upload = require("../middlewares/multer");

router.post("/register", upload.array("image"), controller.registerControl);
// router.get("/list", controller.infoControl);
// router.delete("/withdrawal", controller.withdrawalControl);

module.exports = router;
