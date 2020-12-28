const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
    done(null, user._id.toString());
  });
  
  passport.deserializeUser((req, id, done) => {
    req.db.collection('users')
    .findOne(ObjectId(id)).then((user) => done(null,user));
  });
  
  passport.use(
    new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, email, password, done) => {
            const user = await req.db.collection('users').findOne({ email });
            if (user && (await bcrypt.compare(password, user.password)))
            done(null, user);
            else done (null, false)
        },
    ),
  );