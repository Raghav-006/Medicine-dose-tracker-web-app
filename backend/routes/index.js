const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/index.controller');
const {hasAuthorization,signout} = require('../middleware/auth');


/* GET home page. */
router.route('/')
.get();

router.route('/registeruser').post(userCtrl.register);

router.route('/login').post(userCtrl.login);

router.route('/signout').get(userCtrl.logout);


module.exports = router;
