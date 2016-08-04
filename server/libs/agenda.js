var Agenda = require('agenda');
var agenda = new Agenda({db: {address: "mongodb://localhost/agenda"}});

agenda.on('ready', function () {
    agenda.define('test-timer', function (job, done) {
        require('mongoose').model('Test').findOne({_id: job.attrs.data.testId, status: 'run'}, function (err, test) {
            if (!err && test) {
                test.status = 'checking';
                test.save();
            }
        });
        done();
    });

    agenda.start();
});


agenda.setTimer = function (jobName, data, delay) {
    var date = new Date();
    date.setMilliseconds(date.getMilliseconds() + delay);
    this.schedule(date, jobName, data);
}
module.exports = agenda;
