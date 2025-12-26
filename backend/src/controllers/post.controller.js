// src/controllers/post.controller.js
const { Post, Comment, User } = require('../models');

/**
 * ==========================
 * Get All Posts
 * ==========================
 */
exports.list = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'email'] },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(posts);
  } catch (err) {
    console.error('POST LIST ERROR →', err);
    res.status(500).json({
      message: 'Failed to fetch posts',
      error: err.errors || err,
    });
  }
};

/**
 * ==========================
 * Create Post (Text / Image / Video)
 * ==========================
 */
exports.create = async (req, res) => {
  try {
    const { content } = req.body;
    const file = req.file;
    const userId = req.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: user not set' });
    }

    if (!content && !file) {
      return res.status(400).json({ message: 'Post must have text or media' });
    }

    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      mediaUrl = `/uploads/${file.filename}`;
      const ext = file.originalname.split('.').pop().toLowerCase();
      if (['mp4', 'mov', 'avi', 'webm', 'mkv'].includes(ext)) {
        mediaType = 'video';
      } else {
        mediaType = 'image';
      }
    }

    const post = await Post.create({
      content: content || '',
      mediaUrl,
      mediaType, // 'image' or 'video'
      authorId: userId,
      reactions: { like: 0, love: 0, haha: 0, wow: 0 },
    });

    const fullPost = await Post.findByPk(post.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'email'] },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (err) {
    console.error('POST CREATE ERROR →', err);
    res.status(500).json({
      message: 'Something went wrong while creating your post.',
      error: err.errors || err,
    });
  }
};

/**
 * ==========================
 * React to Post
 * ==========================
 */
exports.react = async (req, res) => {
  try {
    const { type } = req.body;

    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'username'] },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
        },
      ],
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.reactions) post.reactions = { like: 0, love: 0, haha: 0, wow: 0 };

    if (!['like', 'love', 'haha', 'wow'].includes(type)) {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }

    post.reactions[type] = (post.reactions[type] || 0) + 1;
    await post.save();

    res.json(post);
  } catch (err) {
    console.error('POST REACT ERROR →', err);
    res.status(500).json({
      message: 'Failed to react to post',
      error: err.errors || err,
    });
  }
};

/**
 * ==========================
 * Add Comment
 * ==========================
 */
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.userId || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: user not set' });
    }

    const comment = await Comment.create({
      content: req.body.content,
      postId: post.id,
      authorId: userId,
    });

    const fullComment = await Comment.findByPk(comment.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
    });

    res.status(201).json(fullComment);
  } catch (err) {
    console.error('COMMENT CREATE ERROR →', err);
    res.status(500).json({
      message: 'Failed to add comment',
      error: err.errors || err,
    });
  }
};
