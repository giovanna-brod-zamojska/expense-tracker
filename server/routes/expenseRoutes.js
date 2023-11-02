const express = require('express');
const expenseController = require('../controllers/expenseController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route('/stats').get(expenseController.getStats);
router.route('/monthly-stats').get(expenseController.getDailyStats);

router
  .route('/')
  .get(expenseController.getAllExpenses)
  .post(expenseController.setExpenseUserIds, expenseController.createExpense);

router.use('/:id', expenseController.checkExpenseOwnership);
router
  .route('/:id')
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
