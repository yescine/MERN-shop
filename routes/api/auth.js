const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const ini = require('ini')

const auth=require('../../middleware/auth');

const config = ini.parse(fs.readFileSync('./config/data.ini', 'utf-8'))
const app = express()

const User = require('../../models/User')

// @route create user
// @desc Register new user
// @access public
app.post('/',(req,res)=>{
   const {email, password } = req.body
   if(!email || !password){res.status(400).json({msg:"enter all data"})}
   
   User.findOne({email})
      .then(user=>{
         !user?res.status(400).json({msg:'user does not exist'}):null;

         // validate pass
         bcrypt.compare(password,user.password)
            .then(isMatch=>{
               if(!isMatch) return res.status(400).json({msg:"invalid credential"})
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

// @route api/auth/user
// @desc get user
// @access public

app.get('/users',auth,(req,res)=>{
   User.findById(req.user.id)
   .select('-password')
   .then(user=> res.json(user))
})
module.exports = app