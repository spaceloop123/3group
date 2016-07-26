var mongoose = require('mongoose');
var async = require('async');

function Validator() {
    this._tasks = [function (callback) {
        callback(null, {});
    }];
};

Validator.prototype.checkItem = function (itemName, item) {
    this._tasks.push(function (prev, callback) {
        if (!prev) return callback();

        item(function (err, res) {
            if (err) return callback(err);

            res ? prev[itemName] = res : prev = null;
            callback(null, prev);
        }, prev);
    });
};

Validator.prototype.checkItems = function (items) {
    for (key in items) {
        this.checkItem(key, items[key]);
    }
};

Validator.prototype.exec = function (success, empty, error) {
    try {
        async.waterfall(this._tasks, function (err, res) {
            err ? error(err) :
                res ? success(res) : empty();
        });
    } catch (err) {
        error(err);
    }
}

module.exports = Validator;