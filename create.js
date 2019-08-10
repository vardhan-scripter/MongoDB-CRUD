var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var Books = new Schema({
    title : String,
    author : String,
    category : String
}); 

module.exports = mongoose.model('storybooks', Books);