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
        required: true
    },
    password:{
        type: String,
        required: true
    },
    designation: String,
    gender: String,
    address: String,
    earned_leaves: Number,
    wfh: Number,
    optional_holidays:Number,
    paternity_leaves: Number,
    maternity_leaves: Number,
    image_source: String

})

const Employeedb = mongoose.model('employeedb',schema);

module.exports = Employeedb;