const User = require('../models/userModel')
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');

// Login api
const userLogin = async (req, res) => {
  const {email, password} = req.body
  
    const user = await User.findOne({ email: email})
    if(user){
      const match = await bcrypt.compare(password, user.password);
      if(match){
        jwt.sign({userid:user._id}, process.env.SECRETKEY, (err, token) => {
          res.json({
            token,
            msg:'success'
          })
        })
      } else {
        res.status(400).json({ msg: "fail"})
      }
    }else{
      res.status(400).json({msg:"fail"})
    }
}



// Create User
const signUp = async (req, res) => {
  const saltRounds = 10;
  
    const {name, email, password, passwordConfirm} = req.body
    const myPlaintextPassword = password;

    const checkUser = await User.findOne({ email: email})
    
    try {
      if(checkUser){
        res.status(400).json({ msg: "exist"})
      }else{
        
          if(password === passwordConfirm){
            bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
              let password = hash
              const workout = await User.create({name, email, password})
              res.status(200).json(workout)
          });
            
          }else{
            res.status(400).json({ msg:"password-fail" })
          }      
      }
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}



module.exports = { signUp, userLogin }