var mongoose = require('mongoose');
var async = require('async');

function Validator() {
    this._tasks = {};
}

Validator.prototype.checkItem = function (taskName, getItem, checkItem) {
    this._tasks[taskName] = function (callback) {
        getItem(function (err, item) {
                err ? callback(err) :
                    item ? checkItem(item, callback) : callback();
            }
        );
    };
};

Validator.prototype.validate = function (handle, done) {
    async.parallel(this._tasks, function (err, res) {
        if (err) {
            done(err);
            return;
        }

        for (key in res) {
            if (!res[key]) {
                done();
                return;
            }
        }

        handle(res);
    });
}

module.exports = Validator;