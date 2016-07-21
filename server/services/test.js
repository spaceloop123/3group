var mongoose = require('mongoose');
var Test = mongoose.model('Test');

module.exports.getTestStatus = function (userId, done) {
    Test.findOne({user: userId, $or: [{status: 'available'}, {status: 'requested'}]}, function (err, test) {
        if (err) {
            done(err);
        } else {
            test
                ? done(null, test.status)
                : done(null, 'notAvailable');
        }
    });
};