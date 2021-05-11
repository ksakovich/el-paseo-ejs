const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Request = require("tedious").Request;
// const Connection = require('tedious').Connection;
const dotenv = require('dotenv');

dotenv.config();
const errorController = require('./controllers/error');

const connection = require('./util/database');

const app = express();
console.log("STARTING THE APP");
app.set('view engine', 'ejs');
app.set('views', 'views');


// console.log(connection)
connection.connect()

connection.on('connect', err =>
{
    console.log("TRYING TO CONNECT TO DB");
    err ? console.log(err) : executeStatement();
});

// connection.on('error', err =>
// {
//     console.log("errrr");
//     err ? console.log(err) : executeStatement();
// });



const query = 'SELECT * from items';
const executeStatement = () =>
{
    console.log("RUNNING QUERY");
    const request = new Request(query, (err, rowCount) =>
    {

        err ? console.log(err) : console.log(rowCount);
    });

    request.on('row', columns =>
    {
        columns.forEach(column => console.log(column.value));
    });

    return connection.execSql(request);
};

// const options = { format: 'default' };
// const getAllItems = async () =>
// {
//     try
//     {
//         const items = await connection.execSqlAsync('select * from items', options);
//         console.log(items)
//         return items;
//     } catch (error)
//     {
//         throw (error)
//     }
// };

// async function connectMe()
// {
//     try
//     {
//         await connection.connect()
//         // const onConnectResult = await connection.onConnectAsync();
//         // onConnectResult.connect()

//         // console.log(onConnectResult);


//         await getAllItems()

//         return onConnectResult;
//     } catch (error)
//     {
//         throw error;
//     }
// }



// connectMe().then(() => console.log('aaaaaa')).catch((err) => console.log(err))
// executeStatement().then(() => console.log('dddddd'))



const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3030);
