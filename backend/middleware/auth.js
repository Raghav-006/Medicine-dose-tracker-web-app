const jwt = require('jsonwebtoken');
const Users = require('../database/models/UsersModel');

const hasAuthorization = async (req,res, next)=>{
    try{
        let t = req.cookies.t;
        let token = jwt.verify(t, process.env.jwtSecret);
        let user = await Users.findOne({_id:token._id, 'tokens.token':t});
        if(!user){
            throw new Error()
        }
        req.user = user;
        next()

    }catch(e){
        res.status(401).send({error: 'UnauthorizedError: Please Authenticates'})
    }
};
const signout = async (req, res, next)=>{
try{
    res.clearCookie("t");
    next()
}catch(e){
    res.status(500).send()
}
};

module.exports = {hasAuthorization, signout};