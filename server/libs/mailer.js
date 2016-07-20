var nodeMailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');
var transport = nodeMailer.createTransport(
    smtpTransport({
        service: 'Gmail',
        auth: {
            user: 'thetuga3@gmail.com',
            pass: 'Dctjcnfkmystcjcen'
        }
    })
);


module.exports.sendMail = function(to, subject, text) {
    var params = {
        from: 'thetuga3@gmail.com',
        to: to,
        subject: subject,
        text: text
    };
    transport.sendMail(params, function (err, res) {
        if (err) {
            console.log(err);
        }
    });
};