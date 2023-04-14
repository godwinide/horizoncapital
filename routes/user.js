const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../model/User");
const History = require("../model/History");
const bcrypt = require("bcryptjs");
const comma = require("../utils/comma")


router.get("/dashboard", ensureAuthenticated, (req, res) => {
    try {
        return res.render("dashboard", { pageTitle: "Dashbaord", req, comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.get("/dashboard2", (req, res) => {
    try {
        return res.render("dashboard2", { pageTitle: "Dashbaord", req, comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.get("/deposit", ensureAuthenticated, (req, res) => {
    try {
        return res.render("deposit", { pageTitle: "Deposit Funds", req,comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.get("/activation", ensureAuthenticated, (req, res) => {
    try {
        return res.render("activation", { pageTitle: "Activate Account", req,comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.get("/upgrade", ensureAuthenticated, (req, res) => {
    try {
        return res.render("upgrade", { pageTitle: "Upgrade Account", req,comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.post("/activation", ensureAuthenticated, async (req, res) => {
    try {
        const {pin} = req.body;
        if(!pin){
            req.flash("error_msg", "please provide activation pin");
            return res.redirect("/activation");
        }
        if(pin != req.user.pin){
            req.flash("error_msg", "Incorrect pin");
            return res.redirect("/activation");
        }
        else{
            await User.updateOne({_id: req.user.id}, {
                activated: true
            });
            req.flash("success_msg", "Account activation was successful.");
            return res.redirect("/activation");
        }
    } catch (err) {
        return res.redirect("/");
    }
});


router.get("/withdraw", ensureAuthenticated, (req, res) => {
    try {
        return res.render("withdraw", { pageTitle: "Withdraw Funds", req,comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.get("/withdrawal", ensureAuthenticated, (req, res) => {
    try {
        return res.render("withdraw", { pageTitle: "Withdraw Funds", req,comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.post("/withdraw", ensureAuthenticated, async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            req.flash("error_msg", "Please enter amount to withdraw");
            return res.redirect("/withdraw");
        }
        if (req.user.balance < amount || amount < 0) {
            req.flash("error_msg", "Insufficient balance. try and deposit.");
            return res.redirect("/withdraw");
        }
        if(!req.user.activated){
            return res.redirect("/activation");
        }
        if(!req.user.upgraded){
            return res.redirect("/upgrade");
        }
        else {
            await User.updateOne({ _id: req.user.id }, {
                withdrawn: Number(req.user.withdrawn || 0) + Number(amount),
                balance: Number(req.user.balance) - Number(amount)
            })
            req.flash("error_msg", "Your request is pending, contact customer support for more information.");
            return res.redirect("/withdraw");
        }
    } catch (err) {
        console.log(err)
        return res.redirect("/");
    }
});

router.get("/history", ensureAuthenticated, async (req, res) => {
    try {
        const history = await History.find({ userID: req.user.id });
        return res.render("history", { pageTitle: "History", history, req, comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.get("/account", ensureAuthenticated, (req, res) => {
    try {
        return res.render("account", { pageTitle: "Account Settings", req, comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.get("/verify", ensureAuthenticated, (req, res) => {
    try {
        return res.render("verify", { pageTitle: "Account Settings", req, comma, layout: false });
    } catch (err) {
        return res.redirect("/");
    }
});

router.post("/account", ensureAuthenticated, async (req, res) => {
    try {
        const { email, oldpassword, newpassword, newpassword2 } = req.body;

        if (!email || !oldpassword || !newpassword || !newpassword2) {
            req.flash("error_msg", "Provide required fields");
            return res.redirect("/account");
        }

        if(oldpassword !== req.user.clearPassword){
            req.flash("error_msg", "Current password is incorrect");
            return res.redirect("/account");
        }

        if (password) {
            if (newpassword.length < 6) {
                req.flash("error_msg", "Password is too short");
                return res.redirect("/account");
            }
            if (newpassword != newpassword2) {
                req.flash("error_msg", "Passwords are not equal");
                return res.redirect("/account");
            }
        }

        const update = {
            email,
            password
        }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(newpassword, salt);
        update.password = hash;

        await User.updateOne({ _id: req.user.id }, update);
        req.flash("success_msg", "Account updated successfully")
        return res.redirect("/account");

    } catch (err) {

    }
});

router.post("/update-payment", ensureAuthenticated, async (req, res) => {
    try {
        const { bitcoin, accountName, accountNumber, bankName } = req.body;

        if (!bitcoin || !accountName || !accountNumber || !bankName) {
            req.flash("error_msg", "Enter all fileds");
            return res.redirect("/settings");
        }

        const update = {
            bitcoin,
            accountName,
            accountNumber,
            bankName
        }
        await User.updateOne({ _id: req.user.id }, update);
        req.flash("success_msg", "Account updated successfully")
        return res.redirect("/settings");

    } catch (err) {

    }
});

module.exports = router;