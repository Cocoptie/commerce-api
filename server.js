const express = require('express');
var mysql = require('mysql');
const app = express();
const port = 3000;

var connection = mysql.createConnection({
  user: 'root',
  password: 'root',
  server: 'localhost',
  database: 'commerce-bdd',
  port: '8889',
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
