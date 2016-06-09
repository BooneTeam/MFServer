var mongoose = require('mongoose');

var Schema  = mongoose.Schema;

var CategorySchema  = new Schema({
    image_url:String,
    name:String,
    format:String,
    keywords: Array
});

//export the schema so it can be used elsewhere in the application
// (wherever we require it)

module.exports = mongoose.model('Category', CategorySchema);