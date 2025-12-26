const express = require('express');
const router = express.Router();

// Import the controller
const authController = require('../controllers/auth.controller');

// Each route must point to a function
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
