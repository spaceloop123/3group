var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
    username: {type: String, required:true, lowercase: true, unique: true},
    email: {type: String, required:true, unique: true},
    role: {type: String, enum: ['admin', 'teacher', 'user', 'guest'], required: true},
    hash: {type: String, required:true},
    salt: {type: String, required:true}
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
};

mongoose.model('User', UserSchema);