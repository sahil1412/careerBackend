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
        res.json({error : err})
    }
})

router.get('/:Id',async (req,res)=>{
    let Id = req.params.Id;
    try{
        const result =await JobPost.findOne({_id:Id});
        
        if(result){
            res.json({result : result});
        }

    }
    catch(err){
        res.json({error : err})
    }
})

const token = new Map();

router.post('/addCompany',async (req,res)=>{
    const {username, phone, companyName, email, employeeSize } = req.body;
    console.log(req.body);
    if(!username || !phone || !companyName || !email || !employeeSize){
        return res.json({message : "Please fill all details"})
    }

    try{
        const companyExist = await JobPost.findOne({phone : phone});
        if(companyExist){
            return res.json({message : "company already exists"});
        };
        const companyDetails = new User({username, phone, companyName, email, employeeSize });

        const company = await companyDetails.save();
        if(company){
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
        const postDate = Date.now();
        const jobPost = new JobPost({jobTitle, jobDescription, experience, candidates, endDate, postDate});

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


let otp = '12345', user;

router.post("/signup",async(req,res) =>{
    try{
        console.log(req.body.phone);
        const {username, phone, companyName, email, employeeSize } = req.body;
        const existingUser = await User.findOne({phone : phone});
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
        let msgOption = {
            from : process.env.NUMBER,
            to: `+91${phone}`,
            body : `Your otp verification for ${username} is : ${otp}`
        }
        try{
            await client.messages.create(msgOption);
            return res.json({"msg" : "otp send to your number", "success" : true});
        }
        catch (err){
            res.json({"msg" : "enter valid number"});
        }
        // await client.messages
        // .create({
            
        // })
        // .((then) => res.json({"msg" : "otp send to number"}))
        // .done();
    } catch(e){
        return res.status(500).json({error:e.message});
    }
});

router.post("/signup/verify",async(req,res)=>{
    try{
        console.log(req.body);
        const { phoneOTP, emailOTP } = req.body;

        if(otp != phoneOTP){
            return res.status(400).json({msg : "Incorrect otp"});
        }
        user = await user.save();
        return res.status(200).json({msg : "user added successfully"});
    } catch(e){
        res.status(500).json({error : e.message});
    }
})

router.get("/list",async (req,res) =>{
    try{
        const result =await User.find({});
        if(result){
            res.json({result : result});
        }
        else{
            res.json({result : null});
        }

    }
    catch(err){
        res.json({error : err})
    }
})

module.exports = router;