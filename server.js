const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

//Express middleware
app.use(express.urlencoded({extended:false}));
//parses incoming requests into JSON
app.use(express.json());

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

// Default response for any other request (Endpoint Not Found)
// Because this catches all routes, as the endpoint is not specced, put this at the end
app.use((req, res) => {
    res.status(404).end();
});

//start Express.js server on port 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});