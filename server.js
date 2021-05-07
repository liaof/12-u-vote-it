const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

const inputCheck = require('./utils/inputCheck');

//Express middleware
app.use(express.urlencoded({extended:false}));
//parses incoming requests into JSON
app.use(express.json());

//prepend '/api' to the route string returned by apiRoutes, and use
app.use('/api', apiRoutes);

// Default response for any other request (Endpoint Not Found)
// Because this catches all routes, as the endpoint is not specced, put this at the end
app.use((req, res) => {
    res.status(404).end();
});

//start Express.js server on port 3001


db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});