const express = require('express'); 
const authController = require('../controller/authController');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', authController.signup, authController.verifyEmail);
router.post('/signin', authController.signin);
router.post('/verifyEmail', authController.verifyEmail);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;