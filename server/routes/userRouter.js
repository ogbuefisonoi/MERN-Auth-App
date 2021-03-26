const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth");
// const sendEmail = require("../services/mail_password");
const nodemailer = require('nodemailer');

// register route
router.post("/register",async (req, res) =>{
    // console.log(req.body);
    try{
        let {email, password, passwordCheck, userName} = req.body;

        //validate
        if (!email || !password || !passwordCheck)
            return res.status(400).json({msg: "Fill out all required fields."});
        if (password.length<5)
            return res
            .status(400)
            .json({msg: "The password needs to be at least 5 characters long."});
        if (password !== passwordCheck)
            return res
            .status(400)
            .json({msg: "Please confirm your password."});
        const existingUser = await User.findOne({email: email });
        if (existingUser)
            return res
                .status(400)
                .json({msg: "An account with this email already exist."});   
        if (!userName) userName = email; 

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        // console.log(passwordHash)

        //Register New User
        console.log(userName);
        const newUser = new User({
            email,
            password: passwordHash,
            userName
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

    }
    catch(err){
        res.status(500).json({error: err.message});
    }

});

// login route
router.post("/login", async (req, res) =>{
    // console.log(req.body);
    try{
        const {email, password} = req.body;

        //validate
        if (!email || !password)
            return res.status(400).json({msg: "Not all fields have been entered."});

        const user = await User.findOne ({email: email});
        if(!user)
            return res
                .status(400)
                .json({msg: "No account with this email."});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials."});   
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user:{
                id: user._id,
                userName: user.userName,
                email: user.email,
            },
        });
        // console.log("login request sent:", user.userName, user.password, user.email);
    } catch(err){
        res.status(400).json({error: err.message});
    }
})

// delete route
router.delete("/delete", auth, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

//tokenIsValid route
router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// homepage route
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      userName: user.userName,
      id: user._id,
    });

});

// profile route
router.get("/accounts/profile", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      userName: user.userName,
      id: user._id,
      email: user.email,
      password: user.password,
    });
    // console.log("profile:", user.userName, user.email, user.password);
    // console.log(res);

});

// dashboard route
router.get("/dashboard", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "My dashboard",
        content: "Dashboard content",
        user: req.user,
      },
    });
});

router.get("/analytics", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Analytics",
        content: "Content goes here.",
        user: req.user,
      },
    });
});

router.get("/accounts/all", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Accounts List",
        content: "Content goes here.",
        user: req.user,
      },
    });
});

router.get("/accounts/add", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Accounts List",
        content: "Content goes here.",
        user: req.user,
      },
    });
});

router.get("/rep_management", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Accounts List",
        content: "Content goes here.",
        user: req.user,
      },
    });
});

router.get("/products/add", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Accounts List",
        content: "Content goes here.",
        user: req.user,
      },
    });
});

router.get("/products/detail", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Product Detail",
        content: "Content goes here.",
        user: req.user,
      },
    });
});

router.get("/products/add", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Product Detail",
        content: "Content goes here.",
        user: req.user,
      },
    });
});


//customers route
router.get("/customers", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Customers",
        content: "Customers content",
        user: req.user,
      },
    });
});

router.get("/customers/projects", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Customers",
        content: "Customers content",
        user: req.user,
      },
    });
});

router.get("/customers/members", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Customers",
        content: "Customers content",
        user: req.user,
      },
    });
});

router.put('/accounts/profile/update', async (req, res, next) => {
    try{
        const {email, userName, password} = req.body;
        const user = await User.findOne ({email:email});
        // console.log(user._id);
        const update = {$set:{name: userName, password: password}};
        User.findByIdAndUpdate(user._id, update, {new: true, useFindAndModify: false})
        .then()
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
    
});

router.post('/editProfile', async function(req, res, next){
        const {email, userName, password} = req.body;
        if (!userName || !password)
            return res.status(400).json({msg: "Not all fields have been entered."});

        const user = await User.findOne ({email:email});
        
        console.log(user.userName);
        user.email = email;
        user.userName = userName; 
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        user.password = passwordHash;
       
        // don't forget to save!
        user.save(function (err,user) {
            if(err) return res.json({error:err});
            return res.status(200).json({user:user});

            // res.redirect('accounts/profile/');
        }); 
});

router.post('/forgot_password', async (req, res, next) => {
    // token is inside req.params.token
    const {email} = req.body;
    const user = await User.findOne({email: email});
    
    if (user == null) {
        res.json('No account with this email address.');
    } else {
        // res.status(200).send({
        // username: user.email,
        // message: 'Password link accepted',
        // })
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                logger: true,
                debug: true,
                auth: {
                    user: 'johnikems10thousand@gmail.com',
                    pass: 'zmpdszkwggotlqyr' 
                },
            });
        
            const options  = {
                from: 'johnikems10thousand@gmail.com',
                to: email,
                subject: "Reset Password",
                text: "Your New Password is : u83y78e2h#" ,
            };
        
            transporter.sendMail(options, (error, info) => {
              if (error) {
                return error;
              } else {
                // return res.status(200).json({
                //   success: true,
                // });
                console.log("Email sent correctly!");
              }
            });
          } catch (error) {
            return error;
          }
    }
    
 });

module.exports = router;