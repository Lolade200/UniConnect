const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Post = require('./post.model');

const Reaction = sequelize.define('Reaction', {
  type: { type: DataTypes.ENUM('like', 'love', 'haha', 'sad'), allowNull: false },
}, { timestamps: true });

Reaction.belongsTo(User, { foreignKey: 'userId' });
Reaction.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Reaction;
