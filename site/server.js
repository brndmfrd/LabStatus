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


io.on('connection', function (socket) {
  socket.emit('login', 'bob');

var Post = require('./models/post')
app.post('/api/posts', function (req, res, next) {
  var post = new Post({
    body: req.body.body
  });
  post.save(function(err, post) {
    if(err){return next(err)}
    res.status(201).json(post) 
  });
  // node magic here
  socket.emit('login', 'robert');
  socket.broadcast.emit('user joined', 'robert');  
});

app.get('/api/posts', function(req, res, next){
  Post.find(function(err, posts) {
    if(err){return next(err)}
    res.json(posts);
  });
});

});
