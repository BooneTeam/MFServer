var fs = require('fs');
var _ = require('lodash');
var CategoryModel = require('../models/category');
var cloudinary = require('cloudinary');
var mongoose = require('mongoose');

// This reads every file in assets/img/categories and uploads the image to Cloudinary
// and creates a category record. It does not check if they are already
// in the DB or on Cloudinary yet.

// Get Our Categories
mongoose.connect('mongodb://'+config.db.host+'/'+config.db.db_name);
// MOVE THIS STUFF TO A initializer FILE!!
cloudinary.config({
    cloud_name: config.api.cloudinary.cloud_name,
    api_key: config.api.cloudinary.api_key,
    api_secret: config.api.cloudinary.api_secret
});

//Expected names are <name_underscore>-<size>.<format>
var categoryImages = fs.readdirSync('./assets/img/categories');

var categories = categoryImages.map(function (imageName) {
    var categoryName = imageName.split('-')[0].split('_').map(function (word) {
        return _.capitalize(word)
    }).join(' ');

    var format = _.last(imageName.split('.'));

    var categoryObject = {
        name: categoryName,
        image_name: imageName,
        format: format,
        keywords: [categoryName.toLowerCase()]
    };

    return categoryObject
});

function seedCategories(categories) {
    categories.forEach(function (category) {
        cloudinary.v2.uploader.upload("./assets/img/categories/" + category.image_name,
            {public_id: "category_images/" + category.name, tags:'category'},
            function (err, result) {
                category.image_url = result.secure_url;
                var categoryModel = new CategoryModel(category);
                categoryModel.save(function (err, object) {
                    if (err) {
                        console.log(err)
                    };
                    console.log(object)
                });
            })
    })
}

seedCategories(categories);