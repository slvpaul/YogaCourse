import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from '../lib/passport';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import path from 'path';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const MongoStore = connectMongo(session);

function extractUser(req) {
  if (!req.user) return null;
  const { name, email } = req.user;
  return { name, email };
}

if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }
  
  if (!MONGODB_DB) {
    throw new Error(
      'Please define the MONGODB_DB environment variable inside .env.local'
    )
  }

let cached = global.mongo
if (!cached) cached = global.mongo = {}

export default async function connectToDatabase() {
    if (cached.conn) return cached.conn
    if (!cached.promise) {
        const conn = {}
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    cached.promise = MongoClient.connect(MONGODB_URI, opts)
    .then((client) => {
        conn.client = client
        return client.db(MONGODB_DB)
    })
    .then((db) => {
        conn.db = db
        cached.conn = conn
    })   
    }
    await cached.promise
    return cached.conn
}
app.use(session({
    store: new MongoStore({ client: cached.conn })
}));
app.use(bodyParser.json(), cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
 res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
app.get('/user', function(req, res) {
  res.json({ user: extractUser(req)});
});
app.post('/signup', async function(req, res) {
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
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
      res.status(403).send('The email has already been used.');
  }


  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
      if (err) {
          return res.status(400).send({
              message: err
          });
      } else {
          user.hash_password = undefined;
          return res.json(user);
      }
  });
});
app.post('/signin', passport.authenticate('local'), (req, res) => {
  res.json({ user: extractUser(req.user) });
});
app.delete('/logout', function(req, res) {
req.logOut();
res.status(204).end();
});

app.listen(PORT || 8080);
console.log(`Listening on ${PORT}`);

module.exports = app;

return session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore,
    resave: false,
    saveUninitialized: true
});