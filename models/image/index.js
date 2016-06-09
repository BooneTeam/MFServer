var mongoose = require('mongoose');

var Schema  = mongoose.Schema;

var ImageSchema  = new Schema({
    name:String,
    image_url: String,
});

//export the schema so it can be used elsewhere in the application
// (wherever we require it)

module.exports = mongoose.model('Image', ImageSchema);