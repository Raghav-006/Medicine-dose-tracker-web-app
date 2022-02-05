var express = require('express');
var Users = require('../../database/models/UsersModel');
var chalk = require('chalk');
var router = express.Router();
var log = console.log;
var errorHandler = require('../../database/helpers/dbErrorHendler');

router.post('/registerUser', async (req, res, next)=>{
  
  let userData = req.body;
  let name = userData.name.trim().toLowerCase();
  let email = userData.email.trim().toLowerCase();
  let password = userData.password1.trim().toLowerCase();
  let password2 = userData.password2.trim().toLowerCase();

  if(!name || !password || !email){
    return res.send("Username / Email / Password is empty");
  }
  if(password != password2){
    return res.send("Password do not match");
  }
    let users = new Users({name, email, password}) ;
  try{
    await users.save();
    log(chalk.green("information have been saved"));
    res.redirect('/');
    }catch(err){
      res.status(400).send(
        //error: "Unable to save data to database"
          "Unable to save data to database"
      );
    }
  });


module.exports = router;