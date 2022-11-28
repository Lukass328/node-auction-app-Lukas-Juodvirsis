/* eslint-disable max-len */
const bcrypt = require('bcrypt');

const FormSchema = require('../schemas/registerSchema');

module.exports = {
  register: async (req, res) => {
    const { username, passOne } = req.body;

    const userExists = await FormSchema.findOne({ username });
    if (userExists) return res.send({ error: true, message: 'User already exists', data: null });

    // REgister new user
    const hashedPassword = await bcrypt.hash(passOne, 10);

    const formToDb = new FormSchema({ username, passOne: hashedPassword });
    await formToDb.save();
    res.send({ error: false, message: null, data: formToDb });
  },
  login: async (req, res) => {
    const { username, passOne } = req.body;
    const userExists = await FormSchema.findOne({ username });
    if (userExists) {
      req.session.user = userExists.username;
      console.log('  req.session.user ===', req.session.user);
      if (await bcrypt.compare(passOne, userExists.passOne)) {
        return res.send({ error: false, message: null });
      } else {
        return res.send({ error: true, message: 'bad credentials', data: null });
      }
    }
    res.send({ error: true, message: 'bad credentials', data: null });
  },
  authSession: (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false, message: 'Please log in or register' });
    }
  },


}