const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// const Connection = require('tedious').Connection;
const dotenv = require('dotenv');

const dbRespose = require('./util/dbFetcher');
const errorController = require('./controllers/error');

const app = express();
console.log("STARTING THE APP");
console.log(dbRespose);
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3030);