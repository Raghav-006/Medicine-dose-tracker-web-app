const Users = require('../database/models/UsersModel');


const login = async (req, res) => {
  let userData = req.body;
  let email = userData.email.trim().toLowerCase();
  let password = userData.password.trim().toLowerCase();
  try{
    let user = await Users.findByCredentials(email,password);
    let token = await user.generateAuthToken();
    let tt = await user.getPublicProfile();

    res.cookie('t', token, {
      expire: new Date(Date.now() + 2 * 604800000),
      //path: "/",
      //samesite: 'none',
      //secure: true
      //expire: new Date() + 9999,
    });
    return res.status(200).json({user});
  }catch(error){
    res.status(400).json({
      error: "Unable to get user's data "+ error
    });
  }
}

const register = async (req, res) => {
  let userData = req.body;
  let name = userData.name.trim().toLowerCase();
  let email = userData.email.trim().toLowerCase();
  let password = userData.password.trim().toLowerCase();
  let users = new Users({name, email, password}) ;
  try {
    await users.save()
    res.status(200).json({
      message: "Succesfully saved date"
    })
  } catch (error) {
    res.status(400).json({
      error: "Error" + error
    })
  }
}

const logout = async function(req, res){
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
}

module.exports={
    login,
    register,
    logout
  }