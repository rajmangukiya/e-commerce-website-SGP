const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required:true,
        trim:true
    },
    last_name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Enter valid Email id.");
            }
        }
    },
    phone: {
        type:Number,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    tokens:[{
        token: {
            type:String,
            required:true
        }
    }]
})


userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        //console.log(this.password);
        this.password = await bcrypt.hash(this.password, 10);
       //console.log(this.password);
    }
    next();
})

userSchema.methods.generateAuthToken = async function() {
    try {
       // console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;

