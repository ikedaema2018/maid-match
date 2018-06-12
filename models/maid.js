'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Maid = loader.database.define('maids', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING(20),
    primaryKey: true,
    allowNull: false
  },
  pass: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING(1),
    allowNull: false
  },
  income: {
    type: Sequelize.STRING(12),
    allowNull: false
  },
  career: {
    type: Sequelize.STRING,
    allowNull: false
  },
  appeal: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Maid;