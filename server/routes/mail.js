const router = require("express").Router();
const controller = require("../controllers/mail");

router.post("/mailregister", controller.mailregisterControl);
router.get("/maillist", controller.maillistControl);
router.delete("/maildelete", controller.maildeleteControl);

module.exports = router;
