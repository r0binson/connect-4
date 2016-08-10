var express = require("express");
var app = express();
var __dirname = "../connect";
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendFile('index.html', {"root": __dirname});
});

app.listen(port);
console.log("Running at Port " + port);
