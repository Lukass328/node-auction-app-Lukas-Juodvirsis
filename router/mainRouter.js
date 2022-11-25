const express = require('express');
const { login, register, authSession, upload, getAuctions, getOneAuction, updateBid, updateHistory } = require('../controllers/mainController');
const { validateRegistration, validateAuctionInp } = require('../middleware/Validation');

const router = express.Router();


router.post('/register', validateRegistration, register);
router.post('/login', login);
router.post('/upload', validateAuctionInp, upload);
router.post('/update', updateBid);
router.post('/update-bid', updateHistory);
router.get('/auth', authSession);
router.get('/auctions/:_id', getOneAuction);
router.get('/auctions', getAuctions);


module.exports = router;