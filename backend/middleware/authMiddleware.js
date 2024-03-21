const jwt = require('jsonwebtoken');
const User = require("../models/user");


const protect  = async (req, res, next)=>{

    let token;

    token  = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password")
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized! Token failed")
        }
    }else{
        res.status(401)
        throw new Error("Not Authorized! Missing Token")
    }

}

module.exports = protect;