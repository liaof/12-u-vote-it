const mysql = require('mysql2');

//Connect to database via mysql1
const db = mysql.createConnection(
    {
        host:'localhost',
        //Your SQL Username.
        user:'root',
        //Your SQL Password
        password: 'pabl0thef0x!',
        database: 'election'
    },
    console.log('Conected to the election Database')
);

module.exports = db;