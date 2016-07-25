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

Validator.prototype.validate = function (handle, reject) {
    async.parallel(this._tasks, function (err, res) {
        if (err) {
            reject(err);
            return;
        }

        for (key in res) {
            if (!res[key]) {
                reject();
                return;
            }
        }

        handle(res);
    });
}

module.exports = Validator;