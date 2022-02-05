const express = require('express');
const router = express.Router();
const Users = require('../database/models/UsersModel');


/* GET home page. */
router.get('/', function(req, res, next) {
  const t = req.body
  /*res.render('login', {
    title: 'Express',
    layout: 'home',
    head: 'Login'
  });*/
  //res.json({"local":"Mavhungu","t":req,body})
});
router.post('/registeruser', async(req, res, next)=>{
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

router.post('/login', async(req,res,next)=>{
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
})


module.exports = router;
