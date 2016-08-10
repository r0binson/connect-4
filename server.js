var express = require("express");
var app = express();
var __dirname = "../connect";

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(3000);

console.log("Running at Port 3000");