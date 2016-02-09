var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

// MIDDLEWARE - public
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));
app.use('/rps', express.static('public/rpsls'));

// GET ROUTE DIRECTOR FUNCTION
function getDirect(url, filepath){
  app.get(url, function(req, res){
    res.sendFile(process.cwd() + filepath);
  });
}

// HTML APP GET ROUTE
app.get('/apps/:app', function(req, res){
  res.sendFile(process.cwd() + '/views/' + req.params.app + '.html');
});

// GET ROUTES
getDirect('/', '/views/index.html');
getDirect('/portfolio', '/views/portfolio.html');
getDirect('/contact', '/views/contact.html');

// PORT LISTEN
app.listen(PORT, function(){
  console.log('Listening on port: '+PORT);
})