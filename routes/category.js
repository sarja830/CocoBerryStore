const express = require('express')
const router = express.Router()

const { signup, signin, signout, requireSignin, isAdmin, isAuth } = require("../controllers/auth")
const { create,categoryById,read,remove,update,list } = require('../controllers/category')
const { userSignupValidator } = require('../validator')
const { userById } = require('../controllers/user')

//routes
//all the logics are found in controllers


router.get('/category/:categoryId', read)

//usersignup validator is a middle ware custom wrote logic used for validation in validator file
router.post('/category/create/:userId',requireSignin,isAuth,isAdmin,create);

router.put("/category/:categoryId/:userId", requireSignin,isAuth,isAdmin,update);


//as soon as roter.param sees pid and uid it is activated  and req.profile and req.category is set 
//with the help of req.profile authentications methods is able to work 
//with help of req.category  we are able to delete the category
router.delete("/category/:categoryId/:userId", requireSignin,isAuth,isAdmin,remove);
router.get("/categories",list)


router.param("categoryId", categoryById)
router.param("userId", userById)

module.exports = router;