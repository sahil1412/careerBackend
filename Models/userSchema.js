const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{ 
        type : String,
        required : true
    },
    age :{ 
        type : Number,
        required : true
    },
    batch :{ 
        type : String,
        required : true
    },
    mobile :{
        type : Number,
        required : true
    },
    email :{
        type : String,
        requred : true
    }
})

const User = mongoose.model('USER',userSchema);

module.exports = User;