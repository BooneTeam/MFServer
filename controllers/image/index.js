// Include Mongoose Model
var ImageModel = require('../../models/image');
Entry = function () {


    var self = this;

    self.getAll = function (req, res, next) {
        // query.find({
        //     success: function (users) {
        //         res.send(users);
        //     }
        // });
    };

    self.getOne = function (req, res, next) {
        // query.find({
        //     options:{id:params.id},
        //     success: function (users) {
        //         res.send(users);
        //     }
        // });
    };
};

module.exports = new ImageModel;