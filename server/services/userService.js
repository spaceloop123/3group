var mongoose = require('mongoose');
var User = mongoose.model('User');
var Validator = require('../libs/requestValidator');

module.exports.getUserList = function (n, filter, done) {
    var CHUNK_COUNT = 10;
    var regExp = new RegExp('^'+filter+'$', "i");

    new Validator()
        .checkItem('users', function (callback) {
            User.find({$or:[
                {firstName: regExp},
                {lastName: regExp},
                {role: regExp}
            ]}, callback);
        })
        .exec(function (res) {
            done(null, res.users.slice(n, (n + CHUNK_COUNT >= res.users.length ? res.users.length - 1 : n + CHUNK_COUNT)).map(function (item) {
                return item.getInfo();
            }));
        }, done, done);
};