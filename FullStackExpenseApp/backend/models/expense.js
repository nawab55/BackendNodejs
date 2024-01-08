const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
