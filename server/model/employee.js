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
        required: true,
        
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