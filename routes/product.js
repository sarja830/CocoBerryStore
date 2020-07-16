const express = require('express')
const router = express.Router()

const { signup, signin, signout, requireSignin, isAdmin, isAuth } = require("../controllers/auth")
const { create, read, remove, update, productById, list, listRelated, listCategories, listBySearch,photo } = require('../controllers/product')
const { userSignupValidator } = require('../validator')
const { userById } = require('../controllers/user')
const { route } = require('./auth')

//routes
//all the logics are found in controllers

//just like secret url in auth
router.get('/product/:productId', read)


//usersignup validator is a middle ware custom wrote logic used for validation in validator file
router.post('/product/create/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    create);

//as soon as roter.param sees pid and uid it is activated  and req.profile and req.product is set 
//with the help of req.profile authentications methods is able to work 
//with help of req.product  we are able to delete the product
router.delete("/product/:productId/:userId", requireSignin,
    isAuth,
    isAdmin,
    remove);

router.put("/product/:productId/:userId", requireSignin,
    isAuth,
    isAdmin,
    update);

router.get('/products', list)
router.get('/products/related/:productId', listRelated)
//it shows the categories hacing prodcts
router.get('/products/categories', listCategories)
router.post('/products/by/search',listBySearch)
router.get('/product/photo/:productId',photo)

router.param("userId", userById)
router.param("productId", productById)

module.exports = router;