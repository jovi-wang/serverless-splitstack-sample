// Import express and request modules
var express = require('express');
var bodyParser = require('body-parser');

// Instantiates Express and assigns our app variable to it
var app = express();
// create application/json parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser);
app.use(urlencodedParser);

// Again, we define a port we want to listen to
const PORT = 4390;

// Lets start our server
app.listen(PORT, function () {
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Example app listening on port " + PORT);
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function (req, res) {
  console.log(req.body);
  console.log(req.body.user_name);
  res.send('working from home!');
});