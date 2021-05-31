const { Session } = require("express-session");
const SessionModel = require('../models/session');
const cookie = require('cookie');


exports.getSignup = (req, res, next) =>
{
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

exports.postSignup = (req, res, next) => { };

exports.getLogin = (req, res, next) =>
{
    console.log(req.session);
    console.log(req.user);
    console.log('isAuthenticated', req.session.isLoggedIn)

    res.render('auth/login', {
        pageTitle: "Login",
        path: "/login",
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req, res, next) =>
{
    const cookies = cookie.parse(req.headers.cookie || '');
    const sessionID = cookies['connect.sid'];

    req.session.userId = req.user.user_id;

    req.session.save(function (err)
    {
        console.log(err);
    });

    req.session.isLoggedIn = true;
    req.session.save((err) =>
    {
        console.log(err);
        res.redirect('/');
    });
};

exports.postLogout = (req, res, next) =>
{
    req.session.destroy(err =>
    {
        console.log(err);
        res.redirect('/');
    });
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