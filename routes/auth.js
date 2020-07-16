const express= require('express')
const router = express.Router()

const {signup,signin,signout,requireSignin}= require("../controllers/auth")
const {userSignupValidator} = require('../validator')
//routes
    //all the logics are found in controllers
        //usersignup validator is a middle ware custom wrote logic used for validation in validator file
router.post('/signup',userSignupValidator,signup);
router.post('/signin',signin);
router.get('/signout',signout);

router.get('/',(req,res)=>{
    res.send("hello")
})

module.exports = router;