const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/index.controller');
const {hasAuthorization,signout} = require('../middleware/auth');


/* GET home page. */
router.route('/')
.get();

router.route('/registeruser',hasAuthorization,).post(userCtrl.register);

router.route('/login',hasAuthorization).post(userCtrl.login);

router.get('/signout',hasAuthorization,signout, async function(req, res){
    try{
      req.user.tokens = [];
      await req.user.save();
      res.status(200).json({
        notofy:"Success"
      });
    }catch(err){
      res.status(400).json({
        error: "Error occurs"+ err
      });
    }
});


module.exports = router;
