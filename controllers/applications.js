
const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// for applications index page 
router.get("/", async(req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id);

        res.render("applications/index.ejs", {applications: currentUser.applications});
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

// view for creating new appln
router.get("/new", async(req, res) => {
    res.render("applications/new.ejs");
});

// post route for sending to db

router.post("/", async(req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

module.exports = router;