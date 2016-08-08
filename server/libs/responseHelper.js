module.exports.dataResponse = function (req, res) {
    return function (err, data) {
        rewriteCookies(req, function () {
            err ? res.status(500).end() :
                data ? res.json(data) : res.status(400).end();
        });
    }
};

module.exports.emptyResponse = function (req, res) {
    return function (err, status) {
        rewriteCookies(req, function () {
            err ? res.status(500).end() :
                status ? res.status(status).end() : res.end();
        });
    }
};

function rewriteCookies(req, done) {
    var tmp = req.session.passport;
    req.session.regenerate(function () {
        req.session.passport = tmp;
        req.session.save(done);
    })
}