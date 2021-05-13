const sql = require('mssql')
const dotenv = require('dotenv');
// const Product = require('../models/product');
dotenv.config()

// const product = Product;
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
            console.log("TRYING TO CONNECT TO DB for fetching all items");
            const result = await sql.query`SELECT * 
                                            FROM items
                                            INNER JOIN item_sizes 
                                            ON items.item_id = item_sizes.item_id`;
            // console.log(result);
            return result.recordset;
        } catch (err)
        {
            console.log(err)
        }
    }

    async insertNewItem(product)
    {
        console.log("product", product);
        console.log("Connecting DB to Inset a new item");
        const transaction = new sql.Transaction(/* [pool] */)
        // console.log("transaction", transaction);
        await this.sql.connect(this.config);
        transaction.begin(err =>
        {
            // console.log("ERROR in DB TRANSCARION", err);

            const request = new sql.Request(transaction);
            // console.log("requesr", request);
            request.input('category_id', sql.Int, product.category_id);
            request.input('item_name', sql.VarChar(255), product.title);
            request.input('vendor_id', sql.Int, product.vendor_id);
            request.input('short_description', sql.VarChar(512), product.description);
            request.input('item_image_url', sql.VarChar(512), product.imageUrl);
            request.input('is_composite', sql.Bit, product.is_composite);
            request.input('unit', sql.VarChar(50), product.unit);
            const stmt = `INSERT INTO items ( category_id, item_name, vendor_id, short_description, item_image_url, is_composite, unit)
            VALUES ( @category_id, @item_name, @vendor_id, @short_description, @item_image_url, @is_composite, @unit)`;
            request.query(stmt, (err, result) =>
            {

                console.log("ERROR in INSERT query", err);

                transaction.commit(err =>
                {
                    console.log("Transaction committed.")
                })
            })

            // request.query(`INSERT INTO items ( category_id, item_name, vendor_id, short_description, item_image_url, is_composite, unit)
            // VALUES ( 1, 'test', 1, 'this is a test item', 'https://www.freeimages.com/photo/test-me-1420159', 0, 'test_unit'`,
            //     (err, result) =>
            //     {
            //         console.log("ERROR in INSERT query", err);

            //         transaction.commit(err =>
            //         {

            //             console.log("Transaction committed.")
            //         })
            //     })
        })


        // try
        // {
        //     await this.sql.connect(this.config);
        //     console.log("TRYING TO CONNECT TO DB to insert a new item");
        //     const result = await sql.query`INSERT INTO items ( category_id, item_name, vendor_id,       short_description, item_image_url, is_composite, unit)
        //     VALUES ( 1, 'test', 1, 'this is a test item', 'https://www.freeimages.com/photo/test-me-1420159', 0, 'test_unit');`
        //     return result.recordset;
        // } catch (err)
        // {
        //     console.log(err)
        // }
    }
};

module.exports = DbFetcher;