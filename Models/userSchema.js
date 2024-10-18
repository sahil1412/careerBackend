const mongoose = require('mongoose');

const companyDetailsSchema = new mongoose.Schema({
    username :{ 
        type : String,
        required : true
    },
    phone :{ 
        type : Number,
        required : true
    },
    companyName :{ 
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    employeeSize :{
        type : Number,
        requred : true
    }
})

const User = mongoose.model('companyDetails',companyDetailsSchema);

module.exports = User;