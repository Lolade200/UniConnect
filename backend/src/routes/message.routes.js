const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller.js');
const auth = require('../middleware/auth.middleware.js');

router.post('/:id/messages', auth, messageController.sendMessage);
router.get('/:id/messages', auth, messageController.getMessages);

module.exports = router;
