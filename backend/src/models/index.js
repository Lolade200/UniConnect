const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user.model');
const Post = require('./post.model');
const Comment = require('./comment.model');

// Set associations
User.hasMany(Post, { as: 'posts', foreignKey: 'authorId' });
Post.belongsTo(User, { as: 'author', foreignKey: 'authorId' });

Post.hasMany(Comment, { as: 'comments', foreignKey: 'postId' });
Comment.belongsTo(Post, { as: 'post', foreignKey: 'postId' });

User.hasMany(Comment, { as: 'comments', foreignKey: 'authorId' });
Comment.belongsTo(User, { as: 'author', foreignKey: 'authorId' });

module.exports = { sequelize, User, Post, Comment };
