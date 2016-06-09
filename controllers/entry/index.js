// Include Mongoose Model
var EntryModel = require('../../models/entry');
Entry = function () {


    var self = this;

    self.all = function (req, res, next) {
        EntryModel.find({},function (err, entries) {
            console.log(entries)
            res.json(entries)
        });
    };

    self.findOne = function (req, res, next) {
        EntryModel.findOne({_id:req.params.id},function (err, entries) {
            console.log(entries)
            res.json(entries)
        });
        // query.find({
        //     options:{id:params.id},
        //     success: function (users) {
        //         res.send(users);
        //     }
        // });
    };

    self.find = function (req, res, next) {
        keywords = req.query.keywords.toLowerCase();
        keywords = req.query.keywords.constructor == Array ? keywords : [keywords];
        console.log(keywords);
        EntryModel.find({keywords: {$in: keywords}},function (err, entries) {
            console.log(entries)
            res.json(entries)
        });
        // query.find({
        //     options:{id:params.id},
        //     success: function (users) {
        //         res.send(users);
        //     }
        // });
    };
};

module.exports = new Entry;