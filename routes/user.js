const express= require('express')
const router = express.Router()
const {userById,read,update}= require("../controllers/user")
const { requireSignin,isAuth, isAdmin } = require('../controllers/auth')

//demo function
    //wht it does is since it has only require signin  it verifies login only . then u  just put user id it will give u the info it doesnt check for authorisation
router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        //req.profile is defined in userById function 
        //user:req.profile is obtained by userById method in user controller
    })
})

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);

//if userId is present in url then userById method will be called 
router.param('userId',userById);


module.exports = router;