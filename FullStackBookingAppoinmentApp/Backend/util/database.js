const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bookingappoinment', 'root', 'Nawab@#$123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
