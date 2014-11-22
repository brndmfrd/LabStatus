var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/labStatus', function () {
  console.log('mongodb connected')
})
module.exports = mongoose

