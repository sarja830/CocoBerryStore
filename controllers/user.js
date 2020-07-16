const User = require('../models/user')


exports.userById= (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"User not found"
            });
        }
        req.profile= user;
        next()
    });
}

exports.read = (req, res) => {
    //we dont want to send userpassword and salt 
    //req.profile is obtained from middleware
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};


exports.update = ( req,res)=>{
    req.body.role = 0; // role will always be 0
    User.findOneAndUpdate({_id:req.profile._id},
        {$set:req.body},
        //to send the updated response to frnt end
        {new:true},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to perform this action"
                })
            }
            user.hashed_password=undefined
            user.salt=undefined;
            res.json(user)
        })
}

