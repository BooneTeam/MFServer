// Include Mongoose Model
var CategoryModel = require('../../models/category');
Category = function () {


    var self = this;

    self.all = function (req, res, next) {
        CategoryModel.find({},function (err, categories) {
            console.log(categories)
            res.json(categories)
        });
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

module.exports = new Category;