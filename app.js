const path = require("path");
const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const csrf = require('csurf');
const flash = require('connect-flash');
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./util/sequelize");
const { store, Session } = require('./models/session');
const { SessionModel } = require('./models/session');
const errorController = require("./controllers/error");
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');

const app = express();
const csrfProtection = csrf();
console.log("STARTING THE APP");

app.set("view engine", "ejs");
app.set("views", "views");



const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth.js");

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(compression());
app.use(morgan('combined'
  , { stream: accessLogStream }
))

const User = require("./models/user");
const Associations = require("./util/associations");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser('keyboard cat'));
app.use(
  session({
    secret: process.env.SECRET,
    store: store,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) =>
{
  if (!req.user)
  {
    if (req.session.userId != null)
    {
      return User.findByPk(req.session.userId)
        .then((user) =>
        {
          req.user = user;
          req.user;
          console.log('req.user->', req.user);
          next();
        })
        .catch((err) =>
        {
          console.log(err);
        });
    }
  }
  next();
});

app.use((req, res, next) =>
{
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.username = req.user?.user_name ?? 'Guest';
  res.locals.isAdmin = req.user?.is_admin ?? false;
  res.locals.csrfToken = req.csrfToken();
  next();
})

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
  })
  // .then((user) =>
  // {
  //     if (!user)
  //     {
  //         return User.create({
  //             user_name: "Kirill",
  //             email: "test@test.com",
  //             password: '123',
  //             is_admin: true,
  //         });
  //     }
  //     return user;
  // })
  // .then((user) =>
  // {
  //     user.getCart().then((cart) =>
  //     {
  //         if (cart)
  //         {
  //             console.log("rertiving cart");
  //             return cart;
  //         } else
  //         {

  //             console.log("crating cart");
  //             return user.createCart();
  //         }
  //     });
  // })
  .then((result) =>
  {
    // console.log(cart);

    console.log();
    console.log();
    console.log();
    console.log();
    console.log("========================================= READY !  ==================================================")
    console.log();
    console.log();
    console.log();
    console.log();

    return app.listen(process.env.PORT || 3000);

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
