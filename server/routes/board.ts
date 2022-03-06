
export {};

const router = require("express").Router();
const controller = require("../controllers/board");
const upload = require("../middlewares/multer");

router.post("/fbimage", upload.array("images"), controller.fbimageControl);
router.post(
  "/fbimageEdit",
  upload.array("images"),
  controller.fbimageEditControl
);
router.post("/fbcontents", controller.fbcontentsControl)
router.get("/fblist", controller.fblistControl);
router.get("/fbtoplist", controller.fbTopListControl);
router.post("/fblike", controller.fblikeControl);
router.post("/fbinfo", controller.fbinfoControl);
router.patch("/fbedit", controller.fbeditControl);
router.delete("/fbdelete", controller.fbdeleteControl);

// router.get("/cblist", controller.cblistControl);
// router.post("/cbinfo", controller.cbinfoControl);
// router.patch("/cbedit", controller.cbeditControl);
// router.delete("/cbdelete", controller.cbdeleteControl);

// router.post("/freelike", controller.freelikeControl);
// router.post("/freedislike", controller.freedislikeControl);
// router.post("/crewlike", controller.crewlikeControl);
// router.post("/crewdislike", controller.crewdislikeControl);

module.exports = router;
