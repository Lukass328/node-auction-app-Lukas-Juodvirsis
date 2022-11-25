/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const ItemSchema = require('../schemas/itemSchema');
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
  upload: async (req, res) => {
    const { title, image, time, price, bid, bidder, bidHistory } = req.body;
    const item = new ItemSchema({
      image,
      title,
      time,
      price,
      bid,
      bidder,
      bidHistory,

    });
    await item.save();
    res.send({ error: false, message: null, data: item });
  },
  getAuctions: async (req, res) => {
    const allAuctions = await ItemSchema.find();



    res.send({ error: false, message: null, data: allAuctions });
  },
  updateBid: async (req, res) => {
    const { bid, bidder, item_id } = req.body;
    const item = await ItemSchema.findOneAndUpdate({ _id: item_id }, { bid: bid, bidder: bidder });
    res.send({ error: false, message: 'all good', data: item })
  },
  updateHistory: async (req, res) => {
    const { bid, bidder, item_id } = req.body;
    const bidHistory = await ItemSchema.findOneAndUpdate({ _id: item_id }, { $push: { bidHistory: { bid: bid, bidder: bidder } } });
    res.send({ error: false, message: 'bid history updated', data: bidHistory })
  },
  getOneAuction: async (req, res) => {
    const { _id } = req.params;
    console.log('req.params.id ===', req.params);

    const auction = await ItemSchema.findById({ _id });
    // console.log('auction ===', auction);


    res.send({ error: false, message: null, data: auction });
  },

}