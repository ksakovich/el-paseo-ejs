const sql = require('mssql')
const dotenv = require('dotenv');

dotenv.config();


const pool = new sql.ConnectionPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_NAME,
    database: process.env.DB_SERVER,
})


//                 user: process.env.DB_USER,
//                 password: process.env.DB_PASS,
//                 database: process.env.DB_NAME,
//                 server: process.env.DB_SERVER,
// const connectionConfig = {
//     server: process.env.DB_SERVER,
//     authentication: {
//         options: {
//             userName: process.env.DB_USER,
//             password: process.env.DB_PASS
//         },
//         type: "default"
//     },
//     options: {
//         database: "el-paseoDB",
//         encrypt: true
//     }
// };

// const connection = new Connection(connectionConfig);

// module.exports = connection;
module.exports = pool.promise();
