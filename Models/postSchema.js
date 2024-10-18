const mongoose = require('mongoose');

const jobPost = new mongoose.Schema({
    jobTitle :{ 
        type : String,
        required : true
    },
    jobDescription :{ 
        type : String,
        required : true
    },
    experience :{ 
        type : Number,
        required : true
    },
    candidates :[{ 
        type : String,
        required : true
    }],
    endDate :{
        type : String,
        required : true
    }
})

const JobPost = mongoose.model('jobPost',jobPost);

module.exports = JobPost;