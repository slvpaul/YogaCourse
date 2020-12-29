const User = require('./src/models/userModel');
const normalizeEmail = require('validator/lib/normalizeEmail')
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
require('dotenv').config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;


// Server
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
}));
app.use(bodyParser.json(), cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'build')));

// Passport
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser((req, id, done) => {
  db.collection('users')
  .findOne(ObjectId(id)).then((user) => done(null,user));
});

passport.use( new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
          const user = await db.collection('users').findOne({ email });
          if (user && (await bcrypt.compare(password, user.password)))
          done(null, user);
          else done (null, false)
      },
  ),
);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
 });
 app.post('/signup', async (req, res) => {
    const newUser = new User(req.body);
    const password = req.body.password;
    const email = normalizeEmail(req.body.email);

    if(!isEmail(email)) {
      res.status(400).send('The email you entered is invalid');
      return;
  }
  if (!password) {
      res.status(400).send('Missing password');
      return;
  }
  if ((await db.collection('users').countDocuments({ email })) > 0) {
      res.status(403).send('The email has already been used.');
  }
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
      if (err) {
          return res.status(400).send({
              message: err
          });
      } else {
          return res.json(user);
      }
  });
});
app.post('/signin', passport.authenticate('local'), (req, res) => {
  
  
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


app.listen(8080);
console.log(`Listening on 8080`);

module.exports = app;