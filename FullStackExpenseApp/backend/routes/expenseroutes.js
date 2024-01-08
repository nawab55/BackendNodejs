const express = require('express');
const expenseController = require('../controllers/expensecontroller');

const router = express.Router();

router.get('/expenses', expenseController.getAllExpenses);
router.post('/expenses', expenseController.addExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);
router.put('/expenses/:id', expenseController.updateExpense);

module.exports = router;
