const dotenv = require("dotenv")
dotenv.config()
const express = require('express');
var mysql = require('mysql');
const app = express();
const port = 3000;

var connection = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect();

app.get('/', (req, res) => {
  res.send('Dites bonjour à cette api');
});

app.get('/customers/:id', function (req, res) {
  connection.query(
    `select * from customer where id = '${req.params.id}'`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.get('/customers', function (req, res) {
  connection.query(`select * from customer`, function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.get('/sellers', function (req, res) {
    connection.query(`select * from seller`, function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    });
  });

app.get('/products', function (req, res) {
    connection.query(`select product_category_name from product`, function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    });
});

app.get('/reviews', function (req, res) {
    connection.query(`select description from review`, function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
