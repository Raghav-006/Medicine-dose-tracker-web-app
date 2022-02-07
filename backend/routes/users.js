const express = require('express');
const router = express.Router();
const Users = require('../database/models/UsersModel');
const {hasAuthorization,signout} = require('../middleware/auth');

/* GET users listing. */
router.get('/', async(req, res)=>{
  try {
    let names = await Users.find({});
    res.status(200).json({
      names
    })
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong"+ error
    })
  }
});

module.exports = router;