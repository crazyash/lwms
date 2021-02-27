const { mongo } = require("mongoose");

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
<<<<<<< HEAD
        required: true
    },
    password:{
        type: String,
        required: true
=======
        required: true,
        
>>>>>>> bee213ccbdfad2c66dd2092858dce57ca1391f04
    },
    Gender: String,
    Address: String,
    Earned_Leaves: Number,
    WFH: Number,
    Optional_Holidays:Number,
    Paternity Leaves: Number,
    Maternity Leaves: Number

})

const Employeedb = mongoose.model('employeedb',schema);

module.exports = Employeedb;