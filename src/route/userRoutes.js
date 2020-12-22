import passport from '../lib/passport';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

module.exports = function(app) {

function extractUser(req) {
    if (!req.user) return null;
    const { name, email } = req.user;
    return { name, email };
}

app.get('/user', function(req, res) {
    res.json({ user: extractUser(req)});
});

app.post('/signup', function(req, res) {
    const newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
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

};