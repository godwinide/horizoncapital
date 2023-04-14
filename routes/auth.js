const router = require("express").Router();
const User = require("../model/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const path = require("path");

router.get("/signin", (req, res) => {
    try {
        return res.render("signin", { pageTitle: "Login", layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/signin');
});


router.get("/signup", (req, res) => {
    try {
        return res.render("signup", { pageTitle: "Signup", layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.post('/signup', async (req, res) => {
    try {
        const {
            username,
            fullname,
            email,
            phone,
            country,
            currency,
            leverage,
            account_plan,
            password,
        } = req.body;
        console.log(req.body)
        const userIP = req.ip;
        const user = await User.findOne({ email, username });
        const user1 = await User.findOne({ username });
        if (user || user1) {
            return res.render("signup", { ...req.body, error_msg: "A User with that email or username already exists", pageTitle: "Signup", layout: false  });
        } else {
            if (!username || !fullname || !country || !currency || !account_plan || !leverage || !email || !phone || !password) {
                return res.render("signup", { ...req.body, error_msg: "Please fill all fields", pageTitle: "Signup" });
            } else {
                if (password.length < 6) {
                    return res.render("signup", { ...req.body, error_msg: "Password length should be min of 6 chars", pageTitle: "Signup", layout: false  });
                }
                const newUser = {
                    username,
                    fullname,
                    email,
                    phone,
                    currency,
                    account_plan,
                    leverage,
                    country,
                    password,
                    clearPassword: password,
                    userIP
                };
                const salt = await bcrypt.genSalt();
                const hash = await bcrypt.hash(password, salt);
                newUser.password = hash;
                const _newUser = new User(newUser);
                await _newUser.save();
                req.flash("success_msg", "Register success, you can now login");
                return res.redirect("/signin");
            }
        }
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;