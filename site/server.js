var express    = require('express')
var bodyParser = require('body-parser')
var logger     = require('morgan')

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log('Server listen at port %d', port);
});



// Routing
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static(__dirname + '/public'));
//app.use(require('./controllers'));



// Wrap everything in the scope of socket.io
io.on('connection', function (socket) {
  socket.emit('login', 'bob');



// POST requests API connected to our DB
// var Post connects us to our model post.js that 
// connects us to the mongo db via mongoose (/db.js)
var Post = require('./models/post')
app.post('/api/posts', function (req, res, next) {
  var post = new Post({
    stationNumber: req.body.stationNumber,
    stationStatus: req.body.stationStatus
  });
  post.save(function(err, post) {
    if(err){return next(err)}
    res.status(201).json(post) 
  });
  // node magic here
  // socket.broadcast.emit('user joined', 'robert');  
});


// GET requests API connected to our DB 
// var Post connects us to our model post.js that 
// connects us to the mongo db via mongoose (/db.js)
app.get('/api/posts', function(req, res, next){
  Post.find(function(err, posts) {
    if(err){return next(err)}
    res.json(posts);
  });
});


// This is where we serve index.html through node
app.get('/', function(req, res){
  res.sendfile('/public/index.html')
});




});
