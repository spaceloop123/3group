module.exports.dataResponse = function (res) {
    return function (err, data) {
        err ? res.status(500).end() :
            data ? res.json(data) : res.status(400).end();
    }
};

module.exports.emptyResponse = function (res) {
    return function (err) {
        err ? res.status(500).end() : res.end();
    }
};