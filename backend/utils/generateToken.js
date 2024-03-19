const jwt = require("jsonwebtoken")
const jwtsecret = 'asdjkajdu2282'
function generateToken(res, userId){
    const token = jwt.sign({userId}, jwtsecret, {expiresIn:'30d'})
    res.cookie('jwt',token,{
      httpOnly:true,
      secure: process.env.NODE_ENV !=='development',
      sameSite : 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

module.exports = generateToken;