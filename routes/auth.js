const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signout,
    forgotPassword,
    resetPassword,
    googleLogin,
    facebookLogin
    
} = require("../controllers/auth");

// import validators
const {
    userSignupValidator,
    userSigninValidator,
    forgotPasswordValidator,
    resetPasswordValidator

} = require('../validator/auth');

const { runValidation } = require('../validator/index');

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator,signin);
router.get("/signout", signout);
// forgot reset password

router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);
// google and facebook
router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);


module.exports = router;
