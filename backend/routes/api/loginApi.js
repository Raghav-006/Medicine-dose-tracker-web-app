var express = require('express');
var Users = require('../../database/models/UsersModel');
var router = express.Router();

router.post('/login', async (req, res, next)=>{
  if(!req.body.password || !req.body.email){
    throw new Error ("Ran out of Coffee");
  }
    try{
      let user = await Users.findByCredentials(req.body.email,req.body.password);
      if(!user){
        return console.log('gggggggggggggggggggggg');
      }
      let token = await user.generateAuthToken();
      let tt = await user.getPublicProfile();
      console.log({tt, token});
      res.cookie('t', token, {
        expire: new Date() + 9999
      });
      return res.redirect('/users');
    }catch(error){
      res.status(400).send(
          //{error: "No connection to the database "+' '+"mavhungu"}
          "No connection to the database "+' '+"mavhungu : "+ error
        );
    }
  });


module.exports = router;