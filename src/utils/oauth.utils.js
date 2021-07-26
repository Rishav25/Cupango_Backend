const passport = require('passport');



const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
            const GOOGLE_CLIENT_ID = '';
            const GOOGLE_CLIENT_SECRET = '';
            passport.use(new GoogleStrategy({
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:3000/auth/google/callback"
          },
           function(accessToken, refreshToken, profile, done) {
            userProfile=profile;
            return done(null, userProfile);
            
  }
));


const oauth = () => {
    return async function (req, res, next) {
        try {
            
            passport.authenticate('google', { scope : ['profile', 'email'] });
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = oauth;