const express = require('express');
const { login, register, authSession } = require('../controllers/mainController');
const { validateRegistration } = require('../middleware/Validation');

const router = express.Router();


router.post('/register', validateRegistration, register);
router.post('/login', login);


router.get('/auth', authSession);



module.exports = router;