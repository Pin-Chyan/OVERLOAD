const LocalStrategy = require('passport-local').Strategy;
var axios = require('axios');
const apiUrl = 'http://localhost:' + process.env.WEBHOSTPORT + '/api';

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            // validate email
            console.log("validating user")
            axios({
                method: 'post',
                url: apiUrl + '/auth/validate',
                data: {
                  email: email,
                  password: password
                }
            }).then((response) => {
                console.log(response.data)
                if (response.data == 1) {
                    return done(null, email)
                } else if (response.data == 0) {
                    return done(null, false, {message : 'account not verified'})
                } else {
                    return done(null, false, {message : 'incorrect login details'})
                }
            }, (error) => {
                console.log(error)
                return done(null, false, {message : 'Api error'})
            })
        })
        )
        
        passport.serializeUser(function(email, done) {
            console.log("serializing user")
            console.log(email)
            done(null, email);
        });
        
        passport.deserializeUser(function(email, done) {
            axios({
                method: 'post',
                url: apiUrl + '/auth/exists',
                data: {
                  email: email
                }
            }).then((response) => {
                if (response != false) {
                    done(null, email)
                } else {
                    done("could not find user", email)
                }
        })
            
    });
}