const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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
//query() runs the SQL query and executes the callback with all the resulting rows that match the query.
// the query is the 1st param, callback 2nd
// err is the error response, and rows is the database query response
// if there are no errors in the SQL query, err = null
//db.query(`SELECT * FROM candidates`, (err, rows) => {
//    console.log(rows);
//});
// Get all candidates, see above for more info
app.get('/api/candidates', (req, res) => {
    // **** const sql equates to what we would type into the cmd line ***
    const sql = `SELECT candidates.*, parties.name 
                  AS party_name 
                  FROM candidates 
                  LEFT JOIN parties 
                  ON candidates.party_id = parties.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        // upon error, send status code 500 and place the error message (err.message) within a JSON object
        res.status(500).json({ error: err.message });
        return;
      }
      // no error, send the following respons as a JSON object to the browser
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// GET a single candidate based on id
// first parameter is the route parameter that will hold the value of id, as specified
app.get('/api/candidate/:id', (req, res) => {
    // **** const sql equates to what we would type into the cmd line ***
    const sql = `SELECT candidates.*, parties.name 
                  AS party_name 
                  FROM candidates 
                  LEFT JOIN parties 
                  ON candidates.party_id = parties.id 
                  WHERE candidates.id = ?`;
    // assign the id parameter of the request to the const 'params'
    // params will equal the index specified in the url endpoint
    // http://localhost:3001/api/candidate/1 will mean req.params.id = 1
    const params = [req.params.id];

    // any field with a value of '?' will have take the value of the 2nd query() parameter, respectively if there are multiple fields
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
});

// Update a candidate's party
app.put('/api/candidate/:id', (req, res) => {
  const errors = inputCheck(req.body, 'party_id');
  // this error check forces any PUT request to apu/candidate/:id to include a party_id property
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE candidates SET party_id = ? 
               WHERE id = ?`;
               // req.params.id contains the affected row's id
               // req.body.party_id contains the actual fields we are updating
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// get all parties
app.get('/api/parties', (req, res) => {
  const sql = `SELECT * FROM parties`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// get a single partie via id
app.get('/api/party/:id', (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a candidate based on id
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    
    // notice the id = ? the questionmark is a placeholder who's value is determined in the next parameter of query(), which is represented by params
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
});

// delete party via id
app.delete('/api/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
        // checks if anything was deleted
      } else if (!result.affectedRows) {
        res.json({
          message: 'Party not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
});

// chpt. 12.2.7 for Insomnia testing instructions
// Create a candidate
// use post to insert a candidate into the candidates table
app.post('/api/candidate', ({ body }, res) => { //  object destructuring to pull the body property out of the requested object
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');//inputCheck() is part of the coursework, not a native method
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    // when you have multiple elements for both the 1st and 2nd parameters, they are matched by index/order
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//db.query(sql, params, (err, result) => {
//  if (err) {
//    console.log(err);
//  }
//  console.log(result);
//});

// Default response for any other request (Endpoint Not Found)
// Because this catches all routes, as the endpoint is not specced, put this at the end
app.use((req, res) => {
    res.status(404).end();
});

//start Express.js server on port 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});