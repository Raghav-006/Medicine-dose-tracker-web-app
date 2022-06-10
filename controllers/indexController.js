const User = require('../database/models/userModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const {sendWelcomeEmail} = require('../emails/account');

const register = async (req, res)=>{
    const { name, email} = req.body;
    const salt = await bcrypt.genSalt(10);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    /*const checkUser = User.findOne({email:req.body.email});
    if(checkUser){
        return res.status(401).json({msg:"E-mail already in use"});
    }*/
    const hashpassword = await bcrypt.hash(req.body.password,salt);
    const avatars = gravatar.url(req.bosy.email, {s: '100', r: 'x', d: 'retro'}, true)
    const user = new User({
        name: name,
        email: email,
        password: hashpassword,
        avatars: avatars
    });
    const result = await user.save()
    sendWelcomeEmail(req.body.email,req.body.name);
    const {password,...data} = await result.toJSON();
    res.json(data)
};

const login = async(req, res)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.json({
            message: "user not found"
        })
    }
    if(!await bcrypt.compare(req.body.password,user.password)){
        return res.json({
            message: "invalid credntials"
        })
    }
    const token = jwt.sign({_id:user._id.toString()},'secret');
    res.cookie('jwt',token,{
        httpOnly: true,
        SameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60* 1000 // 1day
    })
    res.json({message: "success"})
};

const users = async function(req, res){
    try {
        const cookie = req.cookies.jwt;
        const claim = jwt.verify(cookie,'secret');
        if(!claim){
            res.status(401).json({message: "unauthenticated try"})
        }
        const user = await User.findOne({_id:claim._id})
        const {password,...data}= await user.toJSON()

        res.json(data)
    } catch (error) {
        res.json({message: "Unauthenticated"})
    }
};

const logout = async (req, res)=>{
    res.cookie('jwt','',{maxAge:0})
    res.json({
        message: 'success'
    })
};

module.exports={
    login,register,users,logout
}