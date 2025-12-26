const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Comment extends Model {}

Comment.init({
  content: { type: DataTypes.TEXT, allowNull: false },
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'Comments',
  timestamps: true,
});

module.exports = Comment;
