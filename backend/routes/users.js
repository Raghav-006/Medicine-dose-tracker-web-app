const express = require('express');
const router = express.Router();
const Users = require('../database/models/UsersModel');
const {hasAuthorization,signout} = require('../middleware/auth');

/* GET users listing. */
router.get('/',hasAuthorization, async function(req, res){
  try {
    let user = req.user;
    console.log(user)
    let names = await Users.findOne({id:user._id});
    res.status(200).json({
      names,
      //user
    })
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong"+ error
    })
  }
});

module.exports = router;