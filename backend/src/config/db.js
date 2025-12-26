const { Sequelize } = require('sequelize');
const { db } = require('./env'); // if you're loading from env.js

const sequelize = new Sequelize(db.name, db.user, db.pass, {
  host: db.host,
  dialect: 'mariadb',   // important: matches the driver you just installed
  port: db.port
});

module.exports = sequelize;
