const User = require('../models/user')
const jwt = require('jsonwebtoken'); // to generate signed tokens
const expressJwt = require('express-jwt') // for auhtorization check
const {errorHandler} = require('../helpers/dbErrorHandler')
require("dotenv").config();

exports.signup = (req,res) => {

    console.log("req body",req.body)
    //req.body is working bcoz of body parser middleware
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        //while sending the response we dnt want to send the whole things so we make it undefined before sending
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    })
};


exports.signin = (req,res) => {

    //find user based on email
    const { email,password} = req.body

    //find the email in the db
    //as soon as the user is found it will be returned in the  form of user hence anytime we can use it
    User.findOne({email},(err,user)=>{
        if(err||!user)
        {
            return res.status(400).json({
                err:"User with that email does'nt exist "
            })
        }
        //if user exist make sure email and password match 
        //create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'Email and Password does not match'
            })
        }

        //generate a signed token with user id and secret
        const token =jwt.sign({_id:user._id},process.env.JWT_SECRET)

        //persist the token as 't' in the cookie with expiry date
        res.cookie('t',token,{expire:new Date() +9999})

        //return response wiht user and token to frontend client
        const {_id,name,email,role} = user;

        return res.json({token,user:{_id,email,name,role}})
     })  
};

//when we sign in we put the cookie now we need to clear it
exports.signout = (req,res) => {
    res.clearCookie('t');
    res.json({message:"Signout success "})
}

//this is a middleware which checks for the token once you are logged in 
//jwt has 3 parts header payload and signature so if payload changes it will not match bcoz the signature is made acc to payload and secret
//https://stackoverflow.com/questions/33206941/nodejs-jwt-token-verification now you can get the decode info in auth
//what it does is verify the token and gives the payload of token in the auth 
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
});

    //req.profile is obtained by middlware userById 
    //req.auth is obtained by middle ware requireLogin
exports.isAuth = (req,res,next)=>{
    let user= req.profile && req.auth && req.profile._id == req.auth._id
    if(!user)
    {
        return res.status(403).json({
            error:"Acces denied"
        })
    }
    next()
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0 ){
        return res.status(403).json({
                error:"Admin resource! Access denied"
            })
     
    }
    next()
}