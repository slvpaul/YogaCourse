import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from '../lib/passport';


const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const MongoStore = connectMongo(session);

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

app.listen(PORT);
console.log(`Listening on ${PORT}`);

module.exports = app;

return session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore,
    resave: false,
    saveUninitialized: true
});