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

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(require('./controllers'))


require('./websockets').connect(server);
