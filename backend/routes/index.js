const express = require('express');
const router = express.Router();
const Users = require('../database/models/UsersModel');
const {hasAuthorization,signout} = require('../middleware/auth');


/* GET home page. */
router.get('/', function(req, res) {

});
router.post('/registeruser', async(req, res)=>{
  let userData = req.body;
  let name = userData.name.trim().toLowerCase();
  let email = userData.email.trim().toLowerCase();
  let password = userData.password.trim().toLowerCase();
  let users = new Users({name, email, password}) ;
  try {
    await users.save()
    res.status(200).json({
      users
    })
  } catch (error) {
    res.status(400).json({
      error: "Error" + error
    })
  }
});

router.post('/login', async(req,res)=>{
  let userData = req.body;
  console.log(userData)
  let email = userData.email.trim().toLowerCase();
  let password = userData.password.trim().toLowerCase();
  try{
    let user = await Users.findByCredentials(email,password);
    let token = await user.generateAuthToken();
    let tt = await user.getPublicProfile();

    res.cookie('t', token, {
      expire: new Date() + 9999
    });
    return res.status(200).json({user});
  }catch(error){
    res.status(400).json({
      error: "Unable to get user's data "+ error
    });
  }
});

router.get('/signout',hasAuthorization, signout, async (req, res)=>{
  try{
    req.user.tokens = [];
    await req.user.save();
    res.redirect("/");
  }catch(err){
    res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
});


module.exports = router;
