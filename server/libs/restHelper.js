module.exports.dataResponse = function (res, err, data) {
    err ? res.status(500).end() :
        data ? res.json(data) : res.status(400).end();
}