exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        // var tmp = req.session.passport;
        // req.session.regenerate(function () {
        //     req.session.passport = tmp;
        //     req.session.save(function () {
        //         next();
        //     });
        // });
        next();
    } else {
        res.status(401).end();
    }
};

exports.isAdmin = function (req, res, next) {
    req.user.role === 'admin'
        ? next()
        : res.status(403).end();
};

exports.isTeacher = function (req, res, next) {
    req.user.role === 'teacher'
        ? next()
        : res.status(403).end();
};

exports.isUser = function (req, res, next) {
    req.user.role === 'user'
        ? next()
        : res.status(403).end();
};

exports.isGuest = function (req, res, next) {
    req.user.role === 'guest'
        ? next()
        : res.status(403).end();
};

exports.isTested = function (req, res, next) {
    req.user.role === 'user' || req.user.role === 'guest'
        ? next()
        : res.status(403).end();
};