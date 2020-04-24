const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const ini = require('ini')

const config = ini.parse(fs.readFileSync('./config/data.ini', 'utf-8'))
const app = express()

const User = require('../../models/User')

// @route GET application
// @desc Register new user
// @access public
app.post('/',(req,res)=>{
   const {name, email, password } = req.body
   if(!email|| !name || !password){res.status(400).json({msg:"enter all data"})}
   
   User.findOne({email})
      .then(user=>{
         user?res.status(400).json({msg:'user already exist'}):null;
         const newUser= new User({
            name,
            email,
            password
         })
         // create salt and hash
         bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
               if(err) throw err;
               newUser.password=hash;
               newUser.save()
               .then(user=>{
                  jwt.sign(
                     {id:user.id},
                     config.jwt.jwt_pass,
                     {expiresIn:4000},
                     (err,token)=>{
                        if(err) throw err;
                        res.json({token,user:{name:user.name, email:user.email, id: user.id}})
                     }
                  )
               })
            })
         })
      })
})

module.exports = app