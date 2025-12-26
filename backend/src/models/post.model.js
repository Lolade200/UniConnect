const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Post extends Model {}

Post.init({
  content: { type: DataTypes.TEXT, allowNull: true },
  mediaUrl: { type: DataTypes.STRING, allowNull: true },
  reactions: {
    type: DataTypes.JSON,
    defaultValue: { like: 0, love: 0, haha: 0, wow: 0 },
  },
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'Posts',
  timestamps: true,
});

module.exports = Post;
