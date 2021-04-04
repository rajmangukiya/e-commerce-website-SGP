const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_type : {
        type:String,
        trim:true
    },
})

const category = new mongoose.model("category", categorySchema);

module.exports = category;