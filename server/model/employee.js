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
    gender: String,
    el: Number,
    wfh: Number,
    pl: Number,
    ml: Number

})

const Employeedb = mongoose.model('employeedb',schema);

module.exports = Employeedb;