const express = require("express");
const router = express.Router();
const model = require("../models/user-model.js");

//Register User
router.post("/register", async (req, res) => {
    const {userType, data} = req.body;
    try{
        const user = await model.register(userType, data);
        if (user) res.json(user);
        else res.status(400).json({message: "Email already registered"})
    }catch (err){
        res.send(err);
    }
});

// Login User
router.post("/auth", async (req, res) => {
    try {
        const user = await model.login(req.body);
        if(user === null ) res.status(401).json({message: "User not found"}); 
        else if(user === false) res.status(400).json({message: "Wrong password"});
        else res.json(user);
    } catch (err) {
        res.status(400).json({message: 'failed'})
    }
})

module.exports = router;