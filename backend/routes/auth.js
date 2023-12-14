var express = require('express');
const passport = require("passport");
const User = require('../models/User');
var router = express.Router();
module.exports = router;

const { body, validationResult } = require('express-validator');

const emailValidation = body('email').isEmail().withMessage('invalid-email');
const passwordValidation = body('password').isLength({ min: 6 }).withMessage('password-too-short');
const firstNameValidation = body('firstName').isLength({ min: 2 }).withMessage('first-name-too-short');
const lastNameValidation = body('lastName').isLength({ min: 2 }).withMessage('last-name-too-short');

router.post('/login',
    passport.authenticate("local", { failWithError: true }),
    function (req, res, ) {
        const user = req.user;
        return res.json({ success: true, user });
    },
    function (err, req, res, ) {
        console.error(err);
        const status = err.status || 500;
        return res.status(status).json({ success: false, error: err });
    });


router.post("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.json({ success: true });
    });
});

router.post("/change-password", [
    emailValidation,
    passwordValidation,
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { password, email, oldPassword } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ success: false, message: "Not logged in", code: "not-logged-in" });
    }

    if (user.email !== email) {
        return res.status(401).json({ success: false, message: "Not logged in", code: "not-logged-in" });
    }

    if (! await user.isValidPassword(oldPassword)) {
        return res.status(401).json({ success: false, message: "Invalid password", code: "invalid-password" });
    }

    try {
        await user.setPassword(password)
        user.save(function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: err });
            }
            return res.json({ success: true });
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err });
    }
});


router.post('/register', [
    emailValidation,
    passwordValidation,
    firstNameValidation,
    lastNameValidation,
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, lastName, firstName } = req.body;

    try {
        const user = await User.register(email, password, firstName, lastName);
        res.json({ success: true, user });
    }
    catch (err) {
        console.error(err);
        res.status(409).json({ success: false, message: err });
    }

});