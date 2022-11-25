module.exports = {
  // eslint-disable-next-line consistent-return
  validateRegistration: (req, res, next) => {
    const { username, passOne, passTwo } = req.body;

    if (username.length < 5 || username.length > 20) return res.send({ error: true, message: 'username to long or to short', data: null });
    if (passOne !== passTwo) return res.send({ error: true, message: 'passwords does not match', data: null });
    if (passOne.length < 5 || passOne.length > 20) return res.send({ error: true, message: 'password length bad not good', data: null });

    next();
  },
  validateAuctionInp: (req, res, next) => {
    const { title, image, time, price } = req.body;

    if (title.length < 5 || title.length > 20) return res.send({ error: true, message: 'title to long or to short', data: null });
    if (image === '') return res.send({ error: true, message: 'Upload your image', data: null });
    // if (price === '') return res.send({ error: true, message: 'Price cant be 0 or negative', data: null });
    // if (time === ) return res.send({ error: true, message: 'Set your time', data: null });

    next();
  },
};
