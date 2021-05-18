const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const DbFetcher = require('./util/dbFetcher');

// const dotenv = require('dotenv');
// dotenv.config()
const sequalize = require('./util/sequelize');
const errorController = require('./controllers/error');

const app = express();
console.log("STARTING THE APP");

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./util/sequelize');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
// sequelize
//     .authenticate()
//     .then(() =>
//     {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err =>
//     {
//         console.error('Unable to connect to the database:', err);
//     });

sequelize.sync().then(result =>
{
    // console.log(result);
    app.listen(3000);
}).catch(err =>
{
    console.log(err);
});


