const sql = require('mssql')
const dotenv = require('dotenv');
dotenv.config()

class DbFetcher
{
    constructor()
    {
        this.sql = require('mssql');
        this.config = {
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            server: process.env.DB_SERVER,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: true, // for azure
                trustServerCertificate: false // change to true for local dev / self-signed certs
            }
        };
    }

    async getAllItems()
    {
        try
        {
            await this.sql.connect(this.config);
            console.log("TRYING TO CONNECT TO DB");
            const result = await sql.query`SELECT TOP 10 * FROM items`
            console.dir(result)
        } catch (err)
        {
            console.log(err)
        }
    }
};

module.exports = DbFetcher;