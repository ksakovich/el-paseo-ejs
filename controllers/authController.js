const { Session } = require("express-session");
const sequelize = require('../util/sequelize');
const SessionModel = require('../models/session');
const cookie = require('cookie');

const User = require('../models/user');


exports.getSignup = (req, res, next) =>
{
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
        username: req.user?.user_name ?? 'Guest'
    });
};

exports.postSignup = (req, res, next) =>
{
    const insertedUsername = req.body.username;
    const insertedEmail = req.body.email;
    const insertedPassword = req.body.password;
    const insertedConfirmPassword = req.body.confirmPassword;
    const isAdmin = false;
    User.findOne({ where: { email: insertedEmail } }).then(user =>
    {
        if (user)
        {
            console.log("++++++++++++++++++++++++++++++++ ERROR: A user with this email already exist");
            return res.redirect('/signup');
        }
        if (insertedPassword !== insertedConfirmPassword)
        {
            console.log("++++++++++++++++++++++++++++++++ ERROR: Passwords do not match");
            return res.redirect('/signup');
        }
        return User.create({
            user_name: insertedUsername,
            email: insertedEmail,
            password: insertedPassword,
            is_admin: isAdmin
        }).then((user) =>
        {
            user.getCart().then((cart) =>
            {
                if (cart)
                {
                    console.log("rertiving cart");
                    return cart;
                } else
                {

                    console.log("crating a new cart in auth controller");
                    return user.createCart();
                }
            });
        }).then(result =>
        {
            console.log("======== User was created ========");
            res.redirect("/login");
        }).catch(err =>
        {
            console.log(err);
        });
    }).catch(err =>
    {
        console.log(err);
    });
};

exports.getLogin = (req, res, next) =>
{
    console.log(req.session);
    console.log(req.user);
    console.log('isAuthenticated', req.session.isLoggedIn)

    res.render('auth/login', {
        pageTitle: "Login",
        path: "/login",
        isAuthenticated: req.session.isLoggedIn,
        username: req.user?.user_name ?? 'Guest'
    });
};

exports.postLogin = (req, res, next) =>
{
    const cookies = cookie.parse(req.headers.cookie || '');
    const sessionID = cookies['connect.sid'];

    const insertedEmail = req.body.email;
    const insertedPassword = req.body.password;

    User.findOne({ where: { email: insertedEmail } })
        .then(user =>
        {
            if (insertedPassword !== user.password)
            {
                console.log("++++++++++++++++++++++++++++++++ ERROR: Passwords do not match");
                return res.redirect('/login');
            }
            if (!user)
            {
                console.log("++++++++++++++++++++++++++++++++ Error: user not found with this email ");
                return res.redirect('/login');
            }
            req.user = user;
            req.session.userId = req.user.user_id;
            return user

        }).then((user) =>
        {
            user.getCart().then((cart) =>
            {
                if (cart)
                {
                    console.log("rertiving cart");
                    return cart;
                } else
                {

                    console.log("crating a new cart in auth controller");
                    return user.createCart();
                }
            });
        }).then(result =>
        {
            req.session.isLoggedIn = true;
            req.session.save((err) =>
            {
                console.log(err);
                res.redirect('/');
            });
        }).catch(err =>
        {
            console.log(err);
        })
};

exports.postLogout = (req, res, next) =>
{
    req.session.destroy(err =>
    {
        console.log(err);
        req.user = null;
        res.redirect('/');

    })
        // .then((result) =>
        // {
        //     res.redirect('/');
        // }).catch(err =>
        // {
        //     console.log(err);
        // })
        ;
    // const cookies = cookie.parse(req.headers.cookie || '');
    // const sessionID = cookies['connect.sid'];

    // req.session.userId = req.user.user_id;

    // req.session.save(function (err)
    // {
    //     console.log(err);
    // });

    // req.session.isLoggedIn = true;
    // res.redirect('/');
};