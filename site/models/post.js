// Called by Node (/server.js) 
// This is our api model that connects us to mongoose (see /db.js)
var db = require('../db')
var Post = db.model('Post', {
  stationNumber: { type: String, required: true},       //00, 01, ..., 78
  stationStatus: { type: String, required: true }       // in/out
});
module.exports = Post

