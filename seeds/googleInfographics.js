'use strict';
var config = require('config');
var google = require('googleapis');
var customsearch = google.customsearch('v1');

var cloudinary = require('cloudinary')

var fs = require('fs');
var request = require('request');
var Promise = require("bluebird");

var mongoose = require('mongoose');
var _ = require('lodash');

var CategoryModel = require('../models/category');
var EntryModel = require('../models/entry');

// You can get a custom search engine id at
// https://www.google.com/cse/create/new
const CX = config.api.googleapis.custom_search_id
const API_KEY = config.api.googleapis.api_key

const TYPE = 'image';
const FILETYPES = 'jpg';

// Get Our Categories
mongoose.connect('mongodb://'+config.db.host+'/'+config.db.db_name);
// MOVE THIS STUFF TO A initializer FILE!!
cloudinary.config({
    cloud_name: config.api.cloudinary.cloud_name,
    api_key: config.api.cloudinary.api_key,
    api_secret: config.api.cloudinary.api_secret
});

var categoryNames = CategoryModel.find({}, function (err, category) {
    return category;
});

Promise.each(categoryNames, function (category) {
    var categoryName = category.name.toLowerCase();
    var search = 'infographic ' + categoryName;
    if (categoryName != 'trending') {
        return new Promise(function (resolve, reject) {
            customsearch.cse.list({
                cx: CX,
                q: search,
                searchType: TYPE,
                fileType: FILETYPES,
                auth: API_KEY
            }, function (err, resp) {
                if (err) {
                    reject(err);
                    // return console.log('An error occured', err);
                }
                // Got the response from custom search
                console.log('Result: ' + resp.searchInformation.formattedTotalResults);
                if (resp.items && resp.items.length > 0) {
                    Promise.each(resp.items,function(item){
                    // download(resp.items[0].link, _.last(resp.items[0].link.split('/'))).then(function (fileName) {
                        saveItem(item, categoryName).then(function () {
                            resolve(item);
                            console.log('First result name is ' + item.title);
                        });
                    });
                        // return upload(resp.items[0],categoryName);
                    // });
                }
            });
        })
    }
});

var download = function (uri, filename) {
    return new Promise(function (resolve, reject) {
        request.head(uri, function (err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream('./assets/img/infographics_google/' + filename)).on('close', function () {
                resolve(filename)
            });
        });
    })
};

var saveItem = function (googleInfographic, categoryName) {
    var entry = {
        image: {
            name: _.last(googleInfographic.link.split('/')),
            image_url: '',
            format: googleInfographic.mime,
        },
        name: googleInfographic.title,
        description: googleInfographic.title,
        keywords: [categoryName.toLowerCase()],
    };
    return new Promise(function (resolve, reject) {
        // cloudinary.v2.uploader.upload("./assets/img/infographics_google/" + entry.image.name,
        //     {public_id: "infographics/"+ categoryName.toLowerCase() + entry.image.name, tags: 'infographic ,'+ categoryName.toLowerCase()},
        //     function (err, result) {
        //         if (err) {
        //             console.log(err)
        //             reject(object);
        //         }
        //         entry.image.image_url = result.secure_url;
        entry.image.image_url = googleInfographic.link;
        var entryModel = new EntryModel(entry);
        entryModel.save(function (err) {
            if (err) {
                console.log(err)
                reject(err);
            }
            ;
            console.log('uploaded ' + entryModel);
            resolve();
        });
    });
    // });
};