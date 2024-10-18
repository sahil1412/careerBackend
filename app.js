const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const cors = require('cors');

dotenv.config({path:'./config.env'});
require('./config/config');

app.use(express.json());
app.use(cors());
app.use(require('./router/auth'));



let port= process.env.PORT || 5000;
app.listen(port);
console.log("Sever is running at port :",port);