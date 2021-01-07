const User = require('./src/models/userModel');
const normalizeEmail = require('validator/lib/normalizeEmail')
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
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

// Middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
}));
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions), bodyParser.json());
app.options('*', cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'build')));
app.use(flash());

// Passport
passport.serializeUser((user, done) => {
  console.log('serialize');
  console.log(user);
  console.log('--------');
  done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
  User.findOne(
    { _id: id },
    'email',
    (err, user) => {
      console.log('deserialize');
      console.log(user);
      console.log('--------');
      done(null, user)
    }
  )
});

passport.use( new LocalStrategy({ usernameField: 'email'},
        function ( email, password, done) {
          User.findOne({ email: email }, (err, user) => {
            if(err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, { message: 'Incorrect username' })
            }
            if (user && (bcrypt.compare(password, user.password))) {
              return done(null, user)
            } 
            else return done(null, false, {message: 'Incorrect password'});
          })
      }));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
 });
 app.get('/user', (req, res, next) => {
    if(req.user) {
      res.json({ user: req.user })
    } else {
      res.json({ user: null })
    }
 });
 app.get('/user/:email', (req, res, next) => {
   console.log(req.params.email);
   User.findOne({ email: req.params.email }, function(err, user) {
     if(err) {
       console.log(err)
     } else {
       res.send(user)
       console.log('Result : ', user);
     }
     
     });
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
app.post('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return next(err); }
    req.logIn(user, function(err) {
      if(err) { return next(err); }
      const userInfo = req.user;
      res.send(userInfo);
    });
  }) (req, res, next);
});
app.delete('/signout', (req, res) => {
  req.logOut();
  res.status(204).end();
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


app.listen(8080);
console.log(`Listening on 8080`);

module.exports = app;