
export {};


const router = require("express").Router();
const controller = require("../controllers/comment");


// //freeboardview

// freeboard commnent
router.post("/fbcomment", controller.fbcommentControl);
router.patch("/fbcommentedit", controller.fbcommenteditControl);
router.delete("/fbcommentdelete", controller.fbcommentdeleteControl);
// // freeboard child commnent
router.post("/fbchildcomment", controller.fbchildcommentControl);
// router.patch("/fbchildcommentedit", controller.fbchildeditControl);
// router.delete("/fbchildcommentdelete", controller.fbchilddeleteControl);

// //crewboard comment
// router.post("/cbcommentregister", controller.cbcommentregisterControl);
// router.patch("/cbcommentedit", controller.cbcommenteditControl);
// router.delete("/cbcommentdelete", controller.cbcommentdeleteControl);
// // crewboard child commnent
// router.post("/cbchildregister", controller.cbchildregisterControl);
// router.patch("/cbchildedit", controller.cbchildeditControl);
// router.delete("/cbchilddelete", controller.cbchilddeleteControl);

module.exports = router;
