const Expense = require('../models/expense');

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({ expenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addExpense = async (req, res) => {
  const { amount, description, category } = req.body;

  try {
    const newExpense = await Expense.create({
      amount,
      description,
      category,
    });

    res.status(201).json({ message: 'Expense added successfully', id: newExpense.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  try {
    await Expense.destroy({
      where: { id: expenseId },
    });

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateExpense = async (req, res) => {
  const expenseId = req.params.id;
  const { amount, description, category } = req.body;

  try {
    await Expense.update(
      { amount, description, category },
      { where: { id: expenseId } }
    );

    res.json({ message: 'Expense updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
};
