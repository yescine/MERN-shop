const jwt = require('jsonwebtoken')
const fs = require('fs')
const ini = require('ini')

const config = ini.parse(fs.readFileSync('./config/data.ini', 'utf-8'))

function auth(req,res,next){
   const token = req.header('x-auth-token')
   if(!token) res.status(401).json({msg:'no token auth denied'})

   try {
      // verify token
      const decoded= jwt.verify(token,config.jwt.jwt_pass)
      req.user=decoded
      next();
   } catch (error) {
      res.status(400).json({msg:error})
   }

}

module.exports = auth;