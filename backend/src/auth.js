const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User');
const MongoStore = require('connect-mongo');
const session = require('express-session')

function initAuth(app) {
    
    const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(session({
        store: new MongoStore({
            mongoUrl: dbUrl,
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'strict',
        }
    }))

    passport.use(new LocalStrategy(
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email })
                if (!user) {
                    return done({
                        status: 404,
                        message: 'User not found',
                        code: 'user-not-found'
                    })
                }
                if (! await user.isValidPassword(password)) {
                    return done({
                        status: 401,
                        message: 'Invalid password',
                        code: 'invalid-password'
                    })
                }
                return done(null, user)
            } catch (err) {
                console.error(err)
                done({
                    status: 500,
                    message: err.message,
                    code: 'server-error'
                })
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = { initAuth }
