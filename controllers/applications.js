
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

// show the specific application
router.get("/:applicationId", async(req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render("applications/show.ejs", {
            application: application, // property shorthand syntax 
            // whenever same property name and variable name holding the value are the same
            // write just {application}
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

// delete application
router.delete("/:applicationId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.id(req.params.applicationId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

// show edit page form
router.get("/:applicationId/edit", async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render("applications/edit.ejs", {application});
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

// upadte edit 
router.put("/:applicationId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        application.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`);
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
})

module.exports = router;