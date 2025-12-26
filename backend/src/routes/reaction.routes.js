const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reaction.controller');
const auth = require('../middleware/auth.middleware');

router.post('/:id/react', auth, reactionController.reactToPost);
router.delete('/:id/react', auth, reactionController.removeReaction);

module.exports = router;
