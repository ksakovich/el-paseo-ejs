// const ConnectionPool = require('tedious-connection-pool');
const Request = require("tedious").Request;
const Connection = require('tedious').Connection;
// const Connection = require('tedious-async').Connection;
const dotenv = require('dotenv');

dotenv.config();

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
        database: "el-paseoDB",
        encrypt: true
    }
};

const connection = new Connection(connectionConfig);

module.exports = connection;
