const express = require('express');
const router = express.Router();
const Users = require('../backend/models/UsersModel');


/* GET home page. */
router.get('/', function(req, res, next) {
  const t = req.body
  /*res.render('login', {
    title: 'Express',
    layout: 'home',
    head: 'Login'
  });*/
  res.json({"local":"Mavhungu","t":req,body})
});
router.get('/register', function(req, res, next) {
  /*res.render('register', {
    title: 'Express',
    layout: 'home',
    head: 'Login'
  });*/
  res.json({})
});
router.post('/',async function(req,res){
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
    res.status(400).json("Error")
  }
})


module.exports = router;
