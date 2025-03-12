
const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

module.exports = router;

// for applications index page 
router.get("/", (req, res) =>{
    if(req.session.user) {      // checks if user logged in
        res.redirect(`/users/:${req.session.user._id}/applications`);
    } else {
        res.render("index.ejs");
    }
});