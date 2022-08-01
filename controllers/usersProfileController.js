const Profile = require('../database/models/User.Profile.Model');
const gravatar = require('gravatar');
require('better-logging')(console);

const getProfile = async(req,res)=>{
  let id = req.user._id;
  try {
    const prof = await Profile.find({id});
    if(!prof){
      return res.json({
        data: 'No record has been found'
      })
    }
    res.json({
      data: prof,
      mesg: 'your data'
    })
  } catch (error) {
    console.error(error);
  }
}

const addProfile = async(req,res)=>{
  let id = req.user._id;
  const data = req.body;
  const avatars = gravatar.url(data.name, {s: '100', r: 'x', d: 'retro'}, true)
  const profile = new Profile({
    id,
    avatars,
    name: data.name,
    surname: data.surname,
    cellphone: data.cellphone,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zipcode
  })
  const result = await profile.save()
  const userProfile = await result.toJSON()
  res.json({userProfile, msg: 'success'})
}

module.exports = {
  getProfile,
  addProfile
}