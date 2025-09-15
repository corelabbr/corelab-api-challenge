const Sequelize = require('sequelize');
const db = new Sequelize('todoDB', 'root', 'root', {
  dialect: 'mariadb',
  host: 'localhost'
});

module.exports = {db, Sequelize};