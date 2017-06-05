/*By: Bradford Wong. Code blog here: http://web.engr.oregonstate.edu/~wongbra/assignment-1-Bradford-Wong/blog.html*/

var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var twitData = require('./twitData');
var app = express();
var port = process.env.PORT || 3000;

var http = require("http");

var css = fs.readFileSync('./public/style.css');
var js = fs.readFileSync('./public/index.js');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/twits/:index', function(req, res, next){
      var index = req.params.index;
      var twit = twitData;
      console.log(twitData.length);
      if(twit && index < twit.length){
            var templateArgs = {
                 twits: [twit[index]],
                 show: false
          }
          res.render('twitPage', templateArgs);
    }else{
         res.status(404).render('404Page');
   }

});

app.get('/', function (req, res, next) {
      console.log("In second get");
      if(req.url == "/twits"){
            console.log("In if index statement");
      }
  var twit = twitData;
  if(req.url == "/index.js"){
        res.statusCode = 200;
        res.writeHead(200, {
             "Content-Type": "text/js"
      });
      res.write(js);
      consolelog("STATUS CODE: ", res.statusCode);
      res.end();
}else if(req.url == "/style.css"){
      res.statusCode = 200;
       res.writeHead(200, {
             "Content-Type": "text/css"
       });
       res.write(css);
       console.log("STATUS CODE: ", res.statusCode);
       res.end();
}else if(twit && req.url == '/twits'){
      var templateArgs = {
           twits: [twit[3]],
           show: true,
           individual: true,
           /*
           text: twits.text, author: twits.author, title: "Twit author: " + twits.author*/
    }
    console.log("Twit 3", twit[3]);
    console.log("TEMPLATE ARGS: ", templateArgs);
    res.render('twitPage', templateArgs);
}else if(twit){
        var templateArgs = {
             twits: twit,
             show: true,
             individual: false, /*Not needed */
             /*
             text: twits.text, author: twits.author, title: "Twit author: " + twits.author*/
      }
      res.render('twitPage', templateArgs);
}else{
      next();
}
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
      res.status(404).render('404Page');
});



// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
