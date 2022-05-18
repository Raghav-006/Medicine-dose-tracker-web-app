const User = require('../database/models/userModel');
const jwt = require('jsonwebtoken');

const hasAuthorization = async (req, res, next) =>{
    try {
        const cookie = req.cookies.jwt;
        const claim = jwt.verify(cookie,'secret');
        if(!claim){
            res.status(401).json({message: "unauthenticated user"})
        }
        const user = await User.findOne({_id:claim._id})
        const {password,...data}= await user.toJSON()
        
        req.user = data;
        next()

    } catch (error) {
        res.json({message: "Unauthenticated"})
    }
};

module.exports = {hasAuthorization};
