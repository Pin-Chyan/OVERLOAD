const LocalStrategy = require('passport-local').Strategy;
var axios = require('axios');
const apiUrl = 'http://localhost:' + process.env.WEBHOSTPORT + '/api';

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            axios({
                method: 'post',
                url: apiUrl + '/auth/validate',
                data: {
                  email: email,
                  password: password
                }
            }).then((response) => {
				// console.log(response.data)
				id = response.data
                if (id >= 1) {
                    return done(null, id)
                } else if (id == 0) {
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
        
        passport.serializeUser(function(id, done) {
            done(null, id);
        });
        
        passport.deserializeUser(function(id, done) {
			if (id > 0) {
				done(null, id)
			} else {
				done("invalid id", id)
			}
        //     axios({
        //         method: 'post',
        //         url: apiUrl + '/user/me',
        //         data: {
        //           id
        //         }
        //     }).then((response) => {
		// 		// console.log(response)
        //         if (response != false) {
        //             done(null, id)
        //         } else {
        //             done("could not find user", id)
        //         }
        // })  
    });
}