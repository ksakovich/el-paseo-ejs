const Request = require("tedious").Request;
const connection = require('./dbConnector');

connection.connect();

let dbRespose;

connection.on('connect', err =>
{
    console.log("TRYING TO CONNECT TO DB");
    err ? console.log(err) : dbRespose = executeStatement();
});

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
module.exports = dbRespose;