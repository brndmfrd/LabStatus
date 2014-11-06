var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/labaccesslog', function () {
  console.log('mongodb connected')
})
module.exports = mongoose
