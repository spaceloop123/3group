var mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
    type: {type: String, enum: ['request', 'done'] , required: true},
    user: {type: String, required: true},
    teacher: {type: String},
    test: {type: mongoose.Schema.Types.ObjectId, ref: 'Test'}
});

mongoose.model('Notification', NotificationSchema);