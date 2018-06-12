'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/maid_match',
  { logging: true });

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};