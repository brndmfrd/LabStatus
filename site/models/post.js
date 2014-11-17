var db = require('../db')
var Post = db.model('Post', {
  body: { type: String, required: true }
});
module.exports = Post

