const express = require('express');
const router = express.Router();
require('../config/config');

const User = require('../Models/userSchema');
const stripe = require('stripe')(process.env.SECRET_KEY);

baseUrl = process.env.URL;

router.get('/',(req,res)=>{
    res.send('hello world');
})

router.post('/add',async (req,res)=>{
    const {name , age, batch, mobile, email, fee} = req.body;
    // const users = req.body;
    if(!name || !age|| !batch|| !mobile|| !email){
        return res.json({message : "Please fill all details"})
    }
    
    if(mobile<1000000000 || mobile > 9999999999){
        return res.json({message : "Invalid Number"});
    }
    
    if(age < 15){
        return res.json({message : "Age must be greater than or equal to 15"});
    }
    else if(age >65){
        return res.json({message : "Age must be less than or equal to 65"});
    }

    try{
        const userExist = await User.findOne({email:email,mobile:mobile});

        if(userExist){
            return res.json({message : "user already exists"});
        }

        const user = new User({name , age, batch, mobile, email})

        const userRegister = await user.save();
        if(userRegister){
            res.json({message:"Registered successfully !!"});
            res.redirect(303,session.url);
        }
        else{
            res.json({message : "Failed to Registered"});
        }

    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;