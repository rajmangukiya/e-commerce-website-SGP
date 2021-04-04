require('dotenv').config();
const  express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const multer = require("multer");
const path = require("path");
const hbs = require("hbs");
const assert = require('assert');;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth"); 
const bcrypt = require("bcryptjs");
const Register = require("./models/registers");
const sell = require("./models/sell");
const category = require("./models/category");
const { info } = require("console");
const selldata = sell.find({});

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// const createToken = async() => {
//     const token = await jwt.sign({_id:"604124f666703446b8a06300"}, "mynameisdixitlukhiandiamtryingonauth", {
//         expiresIn: "10 minutes"
//     });
//     console.log(token);

//     const userVer = await jwt.verify(token, "mynameisdixitlukhiandiamtryingonauth");
//     console.log(userVer);
// }

var Storage = multer.diskStorage({
    destination:"./public/uploads",
    filename : (req, image, cb) => {
        cb(null, image.fieldname + "_" + Date.now() + path.extname(image.originalname));
    }
});

var upload = multer({
    storage:Storage
}).single('image');




app.get("/", (req, res) => {
    res.render("index"); 
});
app.get("/home",async (req,res) => {
    res.render("home");
})

app.get("/signout",auth,async (req,res) => {
     try {
         req.user.tokens = req.user.tokens.filter((currElement) => {
             return currElement.token != req.token;
     })
        
        //Logged out from all
        //req.user.tokens = [];

        res.clearCookie("jwt");
        console.log("Logged out.");
        await req.user.save();
        res.render("signout");
    } catch(error) {
        res.status(500).send(error);
    }
})

app.get("/sell",auth, async (req,res) => {
    selldata.exec((err, data) => {
        if(err) throw err;
        res.status(201).render("sell", {
            sellRecords  : data
            //data : req.body
        });    
    })
    //res.render("sell");
})

app.get("/buy",async (req,res) => {
    sell.find((err, docs) => {
        if(err) throw err;
        else res.render("buy", {sell : docs});
    })
    //res.render("buy");
})

app.get("/about_us",async (req,res) => {
    res.render("about_us");
})

app.get("/contact_us",async (req,res) => {
    res.render("contact_us");
})
app.get("/login",async (req , res) => {
        res.render("home");
})

app.get("/register", async (req , res) => {
    res.render("home");
})

app.get("/userprofile/:email", async (req , res) => {
    Register.find({email: req.params.email}, (err, docs) => {
        if(err) throw err;
        else res.render("userprofile", {Register : docs[0]});
    })
})

app.get("/myproduct",auth,  async (req , res) => {
    sell.find((err, docs) => {
        if(err) throw err;
        else res.render("myproduct", {sell : docs});
    })
})



app.get("/category", async (req, res) => {
    category.find((err,categories) => {
        if(err) return console.log(err);
        res.render("category", {
            categories : categories
        });
    })
})

app.get("/add_category", async (req , res) => {
    res.render("add_category");
})

app.get("/edit_category", async (req , res) => {
    res.render("edit_category");
})

app.get("/delete_category", async (req , res) => {
    res.render("delete_category");
})

app.post("/register", async (req , res) =>{
    try {
        const registerUser = new Register({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password:req.body.password
        })

        const token = await registerUser.generateAuthToken();
        //console.log(token);

        res.cookie("jwt", token);
        //console.log(cookie);

        const registered = await registerUser.save();
       // console.log(registered);
        res.status(201).render("home", {
            data : req.body
        });
    } catch (error) {
        res.status(400).send(error);
        console.log("error part");
    }
})

app.post("/sell", auth, upload, async (req, res) => {
    

    try {
        const sellUser = new sell({
            product_name: req.body.product_name,
            price: req.body.price,
            state: req.body.state,
            city: req.body.city,
            country: req.body.country,
            pincode:req.body.pincode,
            address:req.body.address,
            image: req.file.filename,
        })
        const selled = await sellUser.save();

        selldata.exec((err, data) => {
            if(err) throw err;
            res.status(201).render("sell", {
                sellRecords  : data
                //data : req.body
            });    
        })
        console.log(req.body);
        
    }catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email : email});

        const isMatch = await bcrypt.compare(password, useremail.password);

        const token = await useremail.generateAuthToken();
        //console.log(token);

        
        res.cookie("jwt", token);
        //console.log(cookie);

       //console.log(req.cookies.jwt);

        if(isMatch){
            res.status(201).render("home", {
                data : req.body
            });
        }else{
            res.send("Invalid login details.");
        }

    } catch(error) {
        res.status(400).send("Invalid login details.");
    }
})

app.get("*", (req, res) => {
    res.render("404_error");
})



// createToken();

app.listen(port, () => {
    console.log("server connected at port no "+port);
})