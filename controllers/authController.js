const { Session } = require("express-session");
const SessionModel = require('../models/session');
const cookie = require('cookie');

exports.getLogin = (req, res, next) =>
{
    // const cookie = req.get('Cookie');
    // let cookieAr = cookie.split('; ');
    // console.log(cookieAr);
    // const index = cookieAr.findIndex((element) => element === 'loggedIn=true');
    // const loggedIn = cookieAr[index];
    // let isLoggedIn;
    // if (loggedIn)
    // {
    //     isLoggedIn = true;
    // }
    // else
    // {
    //     isLoggedIn = false;
    // }

    console.log(req.session);
    console.log(req.user);

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
    res.redirect('/');
};