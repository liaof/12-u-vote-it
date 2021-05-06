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

//db object using query() method to print all rows
//This method runs the SQL query and executes the callback with all the resulting rows that match the query.
// the query is the 1st param, callback 2nd
// err is the error response, and rows is the database query response
// if there are no errors in the SQL query, err = null
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// GET a single candidate based on id
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
      console.log(err);
    }
    console.log(row);
});

// Delete a candidate based on id
// notice the id = ? the questionmark is a placeholder who's value is determined in the next parameter, in this case 1
//db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//    if (err) {
//      console.log(err);
//    }
//    console.log(result);
//});

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;//these placeholders are filled out by the following array, in the order they appear
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Default response for any other request (Endpoint Not Found)
// Because this catches all routes, as the endpoint is not specced, put this at the end
app.use((req, res) => {
    res.status(404).end();
});

//start Express.js server on port 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});