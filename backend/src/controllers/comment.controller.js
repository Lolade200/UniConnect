const Comment = require('../models/comment.model');
const User = require('../models/user.model');

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.create({
      content,
      authorId: req.userId,
      postId: req.params.id,
    });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.id },
      include: User,
    });
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
