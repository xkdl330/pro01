var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function hashPW(pwd){
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

exports.signup = function(req, res){
    var user = new User({
        username:req.body.username
    });
    user.set('hashed_password', hashPW(req.body.password));
    user.set('email', req.body.email);
    user.save(function(err){
        if(err){
            res.send('Failed to sign up');
        }
        else{
            res.redirect('/');
        }
    })
}