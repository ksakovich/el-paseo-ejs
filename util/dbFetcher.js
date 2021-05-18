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
            console.log("TRYING TO CONNECT TO DB TO FETCH all items");
            // const result = await sql.query`SELECT items.*, item_sizes.price 
            //                                 FROM items
            //                                 INNER JOIN item_sizes 
            //                                 ON items.item_id = item_sizes.item_id`;

            const result = await sql.query`SELECT items.*
                                            FROM items`;
            // console.log(result);
            // console.log(result.recordset);
            return result.recordset;
        } catch (err)
        {
            console.log(err)
        }
    }

    async insertNewItem(product)
    {
        // console.log("product", product);
        console.log("Connecting DB to Inset a new item");
        const transaction = new sql.Transaction(/* [pool] */)
        await this.sql.connect(this.config);
        transaction.begin(err =>
        {
            const request = new sql.Request(transaction);
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
        })
    }

    async findItemById(itemId)
    {
        try
        {
            await this.sql.connect(this.config);
            console.log("TRYING TO CONNECT TO DB to FIND item by id");
            // const result = await sql.query`SELECT items.*, item_sizes.price 
            //                                 FROM items
            //                                 INNER JOIN item_sizes 
            //                                 ON items.item_id = item_sizes.item_id
            //                                 WHERE items.item_id = ${itemId}`;

            const result = await sql.query`SELECT items.*
                                            FROM items
                                            WHERE items.item_id = ${itemId}`;
            // console.log('result with id', result);
            return result.recordset;
        } catch (err)
        {
            console.log(err)
        }
    }

    async updateById(itemId)
    {
        // UPDATE table_name
        // SET column1 = value1, column2 = value2, ...
        // WHERE condition;
    }

    async deleteById(itemId)
    {
        console.log(`Connecting DB to DELETE the item with id: ${itemId}`);
        const transaction = new sql.Transaction(/* [pool] */)
        await this.sql.connect(this.config);
        transaction.begin(err =>
        {
            const request = new sql.Request(transaction);
            request.input('itemId', sql.Int, itemId);
            const stmt = `DELETE FROM items 
                WHERE item_id = @itemId`;
            request.query(stmt, (err, result) =>
            {
                console.log("ERROR in DELETE query", err);

                transaction.commit(err =>
                {
                    console.log("Transaction committed.")
                })
            })
        })



        // DELETE FROM table_name WHERE condition;
    }
};

module.exports = DbFetcher;