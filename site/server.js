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
/*
app.post('/api/posts', function (req, res, next) {
  var post = new Post({
    stationNumber: req.body.stationNumber,
    stationStatus: req.body.stationStatus
  });
  post.save(function(err, post) {
    if(err){return next(err)}
    res.status(201).json(post) 
  });
});
*/

var id_stationNumber = {"00":"5470cff8a613737a17236a2c",
"01":"5470d001a613737a17236a2d",
"02":"5470d007a613737a17236a2e",
"03":"5470d00ea613737a17236a2f",
"04":"5470d014a613737a17236a30",
"05":"5470d018a613737a17236a31",
"06":"5470d01ea613737a17236a32",
"07":"5470d023a613737a17236a33",
"08":"5470d028a613737a17236a34",
"09":"5470d02da613737a17236a35",
"10":"5470d034a613737a17236a36",
"11":"5470d03aa613737a17236a37",
"12":"5470d041a613737a17236a38",
"13":"5470d047a613737a17236a39",
"14":"5470d04fa613737a17236a3a",
"15":"5470d056a613737a17236a3b",
"16":"5470d05ca613737a17236a3c",
"17":"5470d063a613737a17236a3d",
"18":"5470d068a613737a17236a3e",
"19":"5470d06ea613737a17236a3f",
"20":"5470d074a613737a17236a40",
"21":"5470d079a613737a17236a41",
"22":"5470d07fa613737a17236a42",
"23":"5470d085a613737a17236a43",
"24":"5470d08ba613737a17236a44",
"25":"5470d090a613737a17236a45",
"26":"5470d096a613737a17236a46",
"27":"5470d09ca613737a17236a47",
"28":"5470d0a2a613737a17236a48",
"29":"5470d0a7a613737a17236a49",
"30":"5470d0aea613737a17236a4a",
"31":"5470d0b3a613737a17236a4b",
"32":"5470d0b8a613737a17236a4c",
"33":"5470d0bda613737a17236a4d",
"34":"5470d0c3a613737a17236a4e",
"35":"5470d0c9a613737a17236a4f",
"36":"5470d0cfa613737a17236a50",
"37":"5470d0d4a613737a17236a51",
"38":"5470d0d9a613737a17236a52",
"39":"5470d0dfa613737a17236a53",
"40":"5470d0e4a613737a17236a54",
"41":"5470d0eba613737a17236a55",
"42":"5470d0f1a613737a17236a56",
"43":"5470d0f6a613737a17236a57",
"44":"5470d0fca613737a17236a58",
"45":"5470d103a613737a17236a59",
"46":"5470d108a613737a17236a5a",
"47":"5470d10ea613737a17236a5b",
"48":"5470d113a613737a17236a5c",
"49":"5470d119a613737a17236a5d",
"50":"5470d11fa613737a17236a5e",
"51":"5470d125a613737a17236a5f",
"52":"5470d12aa613737a17236a60",
"53":"5470d12fa613737a17236a61",
"54":"5470d134a613737a17236a62",
"55":"5470d13aa613737a17236a63",
"56":"5470d13fa613737a17236a64",
"57":"5470d147a613737a17236a65",
"58":"5470d14da613737a17236a66",
"59":"5470d158a613737a17236a67",
"60":"5470d162a613737a17236a68",
"61":"5470d168a613737a17236a69",
"62":"5470d16da613737a17236a6a",
"63":"5470d172a613737a17236a6b",
"64":"5470d177a613737a17236a6c",
"65":"5470d17da613737a17236a6d",
"66":"5470d183a613737a17236a6e",
"67":"5470d187a613737a17236a6f",
"68":"5470d18da613737a17236a70",
"69":"5470d192a613737a17236a71",
"70":"5470d199a613737a17236a72",
"71":"5470d19ea613737a17236a73",
"72":"5470d1a2a613737a17236a74",
"73":"5470d1a7a613737a17236a75",
"74":"5470d1aca613737a17236a76",
"75":"5470d1b1a613737a17236a77",
"76":"5470d1b6a613737a17236a78",
"77":"5470d1bba613737a17236a79",
"78":"5470d1c9a613737a17236a7a"};

/*
app.put('/api/posts/:id', function (req, res) {
  return Post.findByID(req.params.id, function(err, product){
    
  Post.update({stationNumber: 'A04'}, {$set: {'stationStatus': 'IN'}}, function(err, numberAffected, raw) {
    if(err) return handleError(err);
    console.log('The number of updated documents was %d', numberAffected);
    console.log('The raw response from Mongo was ', raw);
    //res.status(201).json(post) 
  });
  // node magic here
  // socket.broadcast.emit('user joined', 'robert');  
});
*/

app.post('/api/posts', function (req, res) {
  Post.findByIdAndUpdate(id_stationNumber[req.body.stationNumber], { $set: { stationStatus: req.body.stationStatus }}, function (err, post){
    if (err) return handleError(err);
    res.send(post);
    socket.broadcast.emit('update', req.body);
  });

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
