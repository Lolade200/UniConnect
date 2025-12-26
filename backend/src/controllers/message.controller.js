const Message = require('../models/message.model');
const User = require('../models/user.model');

exports.sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = await Message.create({
      content,
      senderId: req.userId,
      receiverId: req.params.id,
    });
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        senderId: req.userId,
        receiverId: req.params.id,
      },
      include: User,
    });
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
