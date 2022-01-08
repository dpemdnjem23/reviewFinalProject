const router = require("express").Router();
const controller = require("../controllers/auth");

router.post("/signin", controller.signinControl);
router.post("/signup", controller.signupControl);
router.post("/signout", controller.signoutControl);
router.post("/nickcheck", controller.nickcheckControl);
router.post("/mailnickcheck", controller.mailNickcheckControl);
router.get("/refreshtoken", controller.refreshtokenControl);
router.get("/resetrftk", controller.resetrftkControl);

// router.post("/sendemail", controller.sendEmailControl);
// router.post("/confirmemail", controller.confirmEmailControl);

router.post("/kakao", controller.kakaoControl);
router.post("/google", controller.googleControl);

module.exports = router;
