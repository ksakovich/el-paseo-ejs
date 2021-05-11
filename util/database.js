// const ConnectionPool = require('tedious-connection-pool');
const Request = require("tedious").Request;
const Connection = require('tedious').Connection;
// const Connection = require('tedious-async').Connection;
const dotenv = require('dotenv');

dotenv.config();

// const poolConfig = {
//     min: 2,
//     max: 10,
//     log: true,
//     // idleTimeout: 300000,
//     // retryDelay: 5000,
//     // acquireTimeout: 60000
// };

// const connectionConfig = {
//     userName: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     server: process.env.DB_SERVER,
//     options: { "encrypt": true }
// };

const connectionConfig = {
    server: process.env.DB_SERVER,
    authentication: {
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        type: "default"
    },
    options: {
        database: "el-paseoDB", //update me
        encrypt: true
    }
};

// const connectionConfig = {
//     userName: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     server: process.env.DB_SERVER,
//     "options": {
//         database: "el-paseoDB",
//         encrypt: true
//     }
// };

const connection = new Connection(connectionConfig);
// const tp = tp.setConnectionConfig(connectionConfig);

// // Attempt to connect and execute queries if connection goes through
// connection.on("connect", err =>
// {
//     if (err)
//     {
//         console.error(err.message);
//     } else
//     {
//         queryDatabase();
//     }
// });

// function queryDatabase()
// {
//     console.log("Reading rows from the Table...");

//     // Read all rows from table
//     const request = new Request(
//         `SELECT * FROM items`,
//         (err, rowCount) =>
//         {
//             if (err)
//             {
//                 console.error(err.message);
//             } else
//             {
//                 console.log(`${rowCount} row(s) returned`);
//             }
//         }
//     );

//     request.on("row", columns =>
//     {
//         columns.forEach(column =>
//         {
//             console.log("%s\t%s", column.metadata.colName, column.value);
//         });
//     });

//     connection.execSql(request);
// }
// ============================

// const connection = new Connection(config);

module.exports = connection;

// ===============================

//create the pool
// const pool = new ConnectionPool(poolConfig, connectionConfig);

// pool.on('error', function (err)
// {
//     console.error(err);
// });

// //acquire a connection
// pool.acquire(function (err, connection)
// {
//     if (err)
//     {
//         console.error(err);
//         return;
//     }

//     //use the connection as normal
//     const request = new Request('SELECT * FROM items', function (err, rowCount)
//     {
//         if (err)
//         {
//             console.error(err);
//             return;
//         }

//         console.log('rowCount: ' + rowCount);

//         //release the connection back to the pool when finished
//         connection.release();
//     });

//     request.on('row', function (columns)
//     {
//         console.log('value: ' + columns[0].value);
//     });

//     connection.execSql(request);
// });

// =====================================
//create the pool
// var pool = new ConnectionPool(poolConfig, connectionConfig);
// pool.acquire()
//     .then(function (connection)
//     {
//         //use the connection as normal
//         var request = new Request('select 42', function (error, rowCount)
//         {
//             if (error)
//             {
//                 console.error(error);
//                 return;
//             }

//             console.log('rowCount: ' + rowCount);

//             //release the connection back to the pool when finished
//             connection.release();
//         });

//         request.on('row', function (columns)
//         {
//             console.log('value: ' + columns[0].value);
//         });

//         connection.execSql(request);
//     })
//     .catch(function (error)
//     {
//         console.error(error);
//     });

// module.exports = pool;