const Reaction = require('../models/reaction.model');

exports.reactToPost = async (req, res) => {
  try {
    const { type } = req.body;
    const reaction = await Reaction.create({
      type,
      userId: req.userId,
      postId: req.params.id,
    });
    res.json(reaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeReaction = async (req, res) => {
  try {
    const reaction = await Reaction.findOne({
      where: { userId: req.userId, postId: req.params.id },
    });
    if (!reaction) return res.status(404).json({ error: 'Reaction not found' });
    await reaction.destroy();
    res.json({ message: 'Reaction removed' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
