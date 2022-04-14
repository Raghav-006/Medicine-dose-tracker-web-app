const Profile = require('../database/models/User.Profile.Model')

const getProfile = async(req,res)=>{
    res.json({
        msg: 'loaded'
    })
}

const addProfile = async(req,res)=>{
    const data = req.body
    const profile = new Profile({
        name: data.name,
    })
    const result = await profile.save()
    const me = await result.toJSON()
    res.json({me, msg: 'success'})
}

module.exports = {
    getProfile,
    addProfile
}