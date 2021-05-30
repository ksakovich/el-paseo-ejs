const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./util/sequelize");
const { store } = require('./models/session');
const { SessionModel } = require('./models/session');
const errorController = require("./controllers/error");

const app = express();
console.log("STARTING THE APP");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth.js");


const User = require("./models/user");
const Associations = require("./util/associations");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "dummy keyboard cat",
        // store: new SequelizeStore({
        //     db: sequelize, 
        //     // table: "sessions"
        // }),
        store: store,
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        proxy: true, // if you do SSL outside of node.
        saveUninitialized: true
    })
);

// app.use(session({ secret: 'dummy secret', resave: false, saveUninitialized: false }));

app.use((req, res, next) =>
{
    User.findByPk(1)
        .then((user) =>
        {
            req.user = user;
            next();
        })
        .catch((err) =>
        {
            console.log(err);
        });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

Associations.associate();

sequelize
    // .sync({ force: true })
    .sync()
    .then((result) =>
    {
        // console.log("req.session.user._id", req.session.user._id);
        // return User.findByPk(req.session.user._id);
        return User.findByPk(1);
    })
    .then((user) =>
    {
        if (!user)
        {
            return User.create({
                user_name: "Kirill",
                email: "test@test.com",
                is_admin: true,
            });
        }
        return user;
    })
    .then((user) =>
    {
        user.getCart().then((cart) =>
        {
            if (cart)
            {
                console.log("rertiving cart");
                return cart;
            } else
            {

                console.log("crating cart");
                return user.createCart();
            }
        });
    })
    .then((cart) =>
    {
        console.log(cart);

        console.log();
        console.log();
        console.log();
        console.log();
        console.log("========================================= READY !  ==================================================")
        console.log();
        console.log();
        console.log();
        console.log();

        return app.listen(3000);

    })
    .catch((error) =>
    {
        console.log();
        console.log();
        console.log();
        console.log();
        console.log("########################################## ERROR ########################################## ")
        console.log();
        console.log();
        console.log();
        console.log();
        console.log(error);
    });
