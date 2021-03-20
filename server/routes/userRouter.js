const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth");

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
        console.log(user.userName, user.password, user.email);
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
    console.log(user.userName, user.email, user.password);

});

// profile route
router.get("/profile", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      userName: user.userName,
      id: user._id,
    });
    console.log(user.userName, user.email, user.password);

});

// dashboard route
router.get("/dashboard", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "My dashboard",
        content: "dashboard content",
        user: req.user,
      },
    });
});

module.exports = router;