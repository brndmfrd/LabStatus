//project entry point

var express = require('express');

var app = express();


// set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// static middleware
app.use(express.static(__dirname + '/public'));

// Our routes.  Order matters here.  Our 404 handler must be below our routs.
// note: wildcards are OK for routes, but can goof-up ordering.
app.get('/', function(req, res){
	res.render('home');
});
app.get('/about', function(req, res){
	var demonstration = "Hey Hey!"
	res.render('about', {aboutDemo: demonstration});
});

// custom 404 page (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// custom 505 page (middleware)
app.use(function(er, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});




