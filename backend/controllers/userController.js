const User = require('../models/userModel')
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const { application } = require('express')


// Login api
const userLogin = async (req, res) => {
  const {email, password} = req.body
  
    const user = await User.findOne({ email: email})
    if(user){
      if(password === user.password){
        jwt.sign({user}, 'secretKey', (err, token) => {
          res.json({
            token,
            msg:'success'
          })
        })
        // res.status(200).json({userid: user._id, username: user.name, useremail: user.email})
      } else {
        res.status(400).json({ msg: "fail"})
      }
    }else{
      res.status(400).json({msg:"fail"})
    }
}


const postFun = (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if( err ) {
      res.sendStatus(403)
    } else {
      res.json({msg: 'post created', authData})
    }
  })
}


// Verify Token Function
function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken;
    next()
  } else {
    res.sendStatus(403)
  }
}


// Create User

const signUp = async (req, res) => {

    const {name, email, password, passwordConfirm} = req.body

    const checkUser = await User.findOne({ email: email})
    
    try {
      if(checkUser){
        res.status(400).json({ msg: "exist"})
      }else{
        
          if(password === passwordConfirm){
            const workout = await User.create({name, email, password})
            res.status(200).json(workout)
          }else{
            res.status(400).json({ msg:"password-fail" })
          }     
        
      }
      
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}



module.exports = { signUp, userLogin, verifyToken, postFun}