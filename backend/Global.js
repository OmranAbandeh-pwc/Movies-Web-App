const jwt = require('jsonwebtoken')
require('dotenv').config()


// Verify Token Function
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
  
    if(typeof bearerHeader !== 'undefined'){
  
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]  
      
      jwt.verify(bearerToken, process.env.SECRETKEY, (err, authData) => {
        if( err ) {
          res.sendStatus(403)
        } else {
          req.userid = authData.userid
        }
      })
      next()
    } else {
      res.sendStatus(403)
    }
  }


  module.exports = { verifyToken }