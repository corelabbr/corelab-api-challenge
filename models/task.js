const { db, Sequelize } = require('../config/db');

const Task = db.define('task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.DataTypes.TEXT('medium'),
    allowNull: false,
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    defaultValue: '#FFFFFF',
    allowNull: false,
  }
});

module.exports = Task;