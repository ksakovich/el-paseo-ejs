const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const DbFetcher = require('./util/dbFetcher');
// const pool = require('./util/dbConnector');


// const sql = require('mssql')
// const dotenv = require('dotenv');
// dotenv.config()

const errorController = require('./controllers/error');

const app = express();
console.log("STARTING THE APP");
const dbFetcher = new DbFetcher();
dbFetcher.getAllItems();

// const pool = new sql.ConnectionPool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     server: process.env.DB_NAME,
//     database: process.env.DB_SERVER,
// })
// pool.connect(err =>
// {
//     console.log(err);
// });

// const request = new sql.Request(pool);
// pool.exexute('SELECT * FROM items').then().catch()

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
