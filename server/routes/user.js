const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/info', controller.infoControl);
router.post('/password', controller.passwordControl);
router.patch('/edit', controller.editControl);
router.delete('/withdrawal', controller.withdrawalControl);
router.get('/list', controller.listControl);

module.exports = router;
