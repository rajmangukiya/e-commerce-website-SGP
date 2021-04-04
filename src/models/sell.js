const mongoose = require("mongoose");

const sellSchema = new mongoose.Schema({
    image : String,
    product_name: {
        type:String,
        required:true,
        trim:true
    },
    price: {
        type:Number,
        required:true,
        trim:true
    },
    country: {
        type:String,
        required:true,
        trim:true
    },
    state: {
        type:String,
        required:true,
        trim:true
    },
    city: {
        type:String,
        required:true
    },
    pincode: {
        type:Number,
        required:true
    },
    address: {
        type:String,
        required:true,
        trim:true
    }
})

const sell = new mongoose.model("sell", sellSchema);

module.exports = sell;