var Agenda = require('agenda');
var agenda = new Agenda({db: {address: "mongodb://localhost/agenda"}});

agenda.on('ready', function () {
    agenda.define('test-timer', function (job) {
        require('../services/testService').finishTest(job.attrs.data.userId, job.attrs.data.testId, function () {
        });
    });

    agenda.define('send-mail', function (job) {
        require('./mailer').sendMail(job.attrs.data.to, job.attrs.data.subject, job.attrs.data.text);
    });

    agenda.define('open-window', function (job) {
        require('../services/testService').changeTestStatus('available', job.attrs.data.testId, function () {
        });
    });

    agenda.start();
});


agenda.setTimer = function (jobName, data, delay) {
    var date = new Date();
    date.setMilliseconds(date.getMilliseconds() + delay);
    this.schedule(date, jobName, data);
}

module.exports = agenda;
 