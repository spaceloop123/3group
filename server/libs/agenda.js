var Agenda = require('agenda');
var agenda = new Agenda({db: {address: "mongodb://localhost/agenda"}});

agenda.on('ready', function () {
    agenda.define('test-timer', function (job) {
        require('mongoose').model('Test').findOne({_id: job.attrs.data.testId, status: 'run'}, function (err, test) {
            if (!err && test) {
                test.status = 'checking';
                test.save();
            }
        });
    });

    agenda.define('send-mail', function (job) {
        require('./mailer').sendMail(job.attrs.data.to, job.attrs.data.subject, job.attrs.data.text);
    });

    agenda.start();
});


agenda.setTimer = function (jobName, data, delay) {
    var date = new Date();
    date.setMilliseconds(date.getMilliseconds() + delay);
    this.schedule(date, jobName, data);
}

module.exports = agenda;
