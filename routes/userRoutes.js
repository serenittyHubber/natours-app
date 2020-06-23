const express = require('express');
const authController = require('./../controllers/authController.js');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotpassword', authController.forgotPassword);
// router.patch('/forgotpassword', authController.forgotPassword);

module.exports = router;