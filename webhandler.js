var express = require('express');
var router = express.Router();
var db = require('./emporium-db.js');
var formidable = require("formidable");
var path = require('path');

router.get('/pass_reset', function (req, res) {
    res.send('WIP password reset.');
});

router.get('/s', function (req, res) {
    console.log("someone asked for S");
    res.sendFile(path.join(__dirname + '/web/s/1.html'));
});

router.get('/owl', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/img/owl.jpg'));
});

router.get('/rst/:token', function (req, res) {
    db.ParsePasswordResetRequest(req).then(function (data) {
        var status = data.status;
    }).catch(function () {
        console.error("error caught @ password reset");
    });

    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset', {
            user: req.user
        });
    });
});

router.post('/', function (req, res) {
    res.send('POST route on webhandler.');
});
//export this router to use in our index.js
module.exports = router;