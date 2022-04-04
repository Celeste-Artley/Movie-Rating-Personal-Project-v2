const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Model/User");
const CID =
  "116783217320-vu1cnh58grd9epp4ql9rr0sndqb267f6.apps.googleusercontent.com";
const Secret = "tps0ZEdbTlpKBRn_JoMMV13S";
const Callback = "http://localhost:3000/api/google/callback";
function startPassport(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CID,
        clientSecret: Secret,
        callbackURL: Callback,
      },
      async (token, tokenSecret, profile, done) => {
        //console.log(profile);
        const newUser = {
          googleID: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };
        try {
          let user = await User.findOne({ googleID: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
module.exports = startPassport;
