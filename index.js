var express = require('express');
var app = express();
var PORT = 8080;

// MIDDLEWARE - public
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));

// GET ROUTE DIRECTOR FUNCTION
function getDirect(url, filepath){
  app.get(url, function(req, res){
    res.sendFile(process.cwd() + filepath);
  });
}

// GET ROUTES
getDirect('/', '/views/index.html');
getDirect('/portfolio', '/views/portfolio.html');
getDirect('/contact', '/views/contact.html');


// PORT LISTEN
app.listen(PORT, function(){
  console.log('Listening on port: '+PORT);
})