var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var EntrySchema = new Schema({
    image: {
        name: String,
        image_url: String,
        format: String
    },
    name: String,
    description: String,
    keywords: [],
    owner_id: Schema.Types.ObjectId
});

//export the schema so it can be used elsewhere in the application
// (wherever we require it)

module.exports = mongoose.model('Entry', EntrySchema);