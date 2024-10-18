const express = require('express');
const router = express.Router();
require('../config/config');

const User = require('../Models/userSchema');
const JobPost = require('../Models/postSchema');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid,authToken);
baseUrl = process.env.URL;

router.get('/',async (req,res)=>{
    try{
        const result =await JobPost.find({});
        
        if(result){
            res.json({result : result});
        }

    }
    catch(err){
        res.json({error : error})
    }
})

const token = new Map();

router.post('/addPost',async (req,res)=>{
    const {jobTitle, jobDescription, experience, candidates, endDate} = req.body;
    console.log(req.body);
    if(!jobTitle || !jobDescription || !experience || !candidates || !endDate){
        return res.json({message : "Please fill all details"})
    }

    try{
        const postExist = await JobPost.findOne({jobTitle:jobTitle, jobDescription:jobDescription, experience:experience, candidates:candidates, endDate:endDate});
        if(postExist){
            return res.json({message : "job post already exists"});
        }
        
        const jobPost = new JobPost({jobTitle, jobDescription, experience, candidates, endDate})

        const job = await jobPost.save();
        if(job){
            res.json({message:"Job Posted successfully !!"});
        }
        else{
            res.json({message : "Failed to Post"});
        }

    }
    catch(err){
        console.log(err);
    }
});


let otp, user;

router.post("/signup",async(req,res) =>{
    try{
        const {jobTitle, jobDescription, experienceLevel, candidates, endDate} = req.body;

        const existingPost = await User.findOne({phone});
        if(existingUser){
            return res
            .status(400)
            .json({msg : "user with same phone number already exists"});
        }

        user = new User({
            username,
            phone,
            companyName,
            email,
            employeeSize
        })

        let digits = "0123456789";
        otp = "";
        for(let i = 0; i < 5; i++){
            console.log()
            otp += digits[Math.floor(Math.random()*10)];
        }
        console.log(user);
        console.log(otp);
        await client.messages
        .create({
            from : process.env.NUMBER,
            to: `+91${phone}`,
            body : `Your otp verification for ${username} is : ${otp}`
        })
        // .then(() => res.status(200).json({msg:"message sent"}))
        .done();
    } catch(e){
        return res.status(500).json({error:e.message});
    }
});

router.post("/signup/verify",async(req,res)=>{
    try{
        console.log(req.body);
        const{OTP} = req.body;
        if(otp != OTP){
            return res.status(400).json({msg : "Incorrect otp"});
        }
        user = await user.save();
        // const token = jwt.sign({id:user._id},"passwordKey");
        res.status(200).json({msg : "user added successfully"});
        otp = "";
    } catch(e){
        res.status(500).json({error : e.message});
    }
})

module.exports = router;