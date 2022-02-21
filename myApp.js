var express = require('express');
var app = express();
const mySecret = process.env['MESSAGE_STYLE']
var bodyParser = require("body-parser")
app.use("/public", express.static(__dirname + "/public"))
app.use((req,res,next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})
app.use(bodyParser.urlencoded({extended: false}))
app.get("/",(req,res) => {
  res.sendFile(__dirname + "/views/index.html")
})
app.get("/now", function(req,res,next){
  req.time = new Date().toString();
  next();
}, function(req,res){
  res.send({time:req.time})
})
app.get("/json",(req,res) => {
  let response = "Hello json"
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({"message": response.toUpperCase()});
  } else {
    res.json({"message": response});
  }
});
app.get("/:word/echo", (req,res,next) => {
  req.word = req.params.word;
  next()
}, function(req, res){
  res.send({echo: req.word})
})
app.route("/name")
  .get((req, res) =>{
    res.send({name: `${req.query.first} ${req.query.last}`})
  })
  .post((req, res) => {
    res.send({name: `${req.body.first} ${req.body.last}`})
  })

 module.exports = app;
