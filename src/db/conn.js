const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CarryWithU", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log("connected with mongodb.");
}) .catch((e) => {
    console.log("not connect");
})