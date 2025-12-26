const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');

router.post('/:id/comments', auth, commentController.addComment);
router.get('/:id/comments', commentController.getComments);

module.exports = router;
