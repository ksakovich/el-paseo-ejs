const { Session } = require("express-session");
const sequelize = require('../util/sequelize');
const SessionModel = require('../models/session');
const cookie = require('cookie');
const bcrypt = require('bcryptjs');

const User = require('../models/user');


exports.getSignup = (req, res, next) =>
{
    const err = req.flash('error');
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: err
    });
};

exports.postSignup = async (req, res, next) =>
{
    const insertedUsername = req.body.username;
    const insertedEmail = req.body.email;
    const insertedPassword = req.body.password;
    const insertedConfirmPassword = req.body.confirmPassword;
    const isAdmin = false;
    let user = await User.findOne({ where: { email: insertedEmail } });
    if (user)
    {
        await req.flash('error', 'A user with this email already exist');
        req.session.save((err) =>
        {
            return res.redirect('/signup');
        });
        return
    }

    if (insertedPassword !== insertedConfirmPassword)
    {
        await req.flash('error', 'Inserted password & confirm passwords do not match');
        req.session.save((err) =>
        {
            return res.redirect('/signup');
        });
        return;
    }
    const hashedPassword = await bcrypt.hash(insertedPassword, 12)

    user = await User.create({
        user_name: insertedUsername,
        email: insertedEmail,
        password: hashedPassword,
        is_admin: isAdmin
    })
    let cart = await user.getCart();
    if (cart)
    {
        console.log("rertiving cart");
    } else
    {
        console.log("crating a new cart in auth controller");
        cart = await user.createCart();
    }
    console.log("======== User was created ========");
    res.redirect("/login");
};

exports.getLogin = (req, res, next) =>
{
    const err = req.flash('error');
    res.render('auth/login', {
        pageTitle: "Login",
        path: "/login",
        errorMessage: err
    });
};

exports.postLogin = async (req, res, next) =>
{
    const cookies = cookie.parse(req.headers.cookie || '');
    const sessionID = cookies['connect.sid'];

    const insertedEmail = req.body.email;
    const insertedPassword = req.body.password;

    const user = await User.findOne({ where: { email: insertedEmail } });
    if (!user)
    {
        await req.flash('error', 'Invalid email or password');
        req.session.save((err) =>
        {
            return res.redirect('/login');
            // throw 'cancel';
        });

    } else
    {
        const result = await bcrypt.compare(insertedPassword, user.password);
        if (result)
        {
            console.log("++++++++++++++++++++++++++++++++ : Passwords  match");
            req.user = user;
            req.session.userId = req.user.user_id;
        }
        else
        {
            await req.flash('error', 'Invalid email or password');
            req.session.save((err) =>
            {
                return res.redirect('/login');
            });
        }

        const cart = await req.user.getCart()

        if (cart)
        {
            console.log("rertiving cart");
        } else
        {
            console.log("crating a new cart in auth controller");
            cart = await user.createCart();
        }

        req.session.isLoggedIn = result;
        await req.session.save((err) =>
        {
            console.log('logged in and saved', err);
            return res.redirect('/');
        });
    }
};

exports.postLogout = (req, res, next) =>
{
    req.session.destroy(err =>
    {
        console.log(err);
        req.user = null;
        res.redirect('/');

    });
};