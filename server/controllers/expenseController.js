const Expense = require('../models/expenseModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

exports.getAllExpenses = factory.getAll(Expense, true);
exports.getExpense = factory.getOne(Expense);
exports.createExpense = factory.createOne(Expense);
exports.updateExpense = factory.updateOne(Expense);
exports.deleteExpense = factory.deleteOne(Expense);

exports.checkExpenseOwnership = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    if (expense.user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.setExpenseUserIds = (req, res, next) => {
  // allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
// ------------------

exports.getStats = catchAsync(async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.user.id);

  const matchCriteria = {
    user: userId,
  };
  const groupCriteria = {
    _id: {
      year: { $year: '$date' },
      month: { $month: '$date' },
      day: { $dayOfMonth: '$date' },
      category: '$category',
    },
    totalAmount: { $sum: '$amount' },
    averageAmount: { $avg: '$amount' },
    maxAmount: { $max: '$amount' },
    minAmount: { $min: '$amount' },
  };
  if (req.query.type && req.query.type !== 'all') {
    matchCriteria.type = req.query.type;
  }

  if (req.query.year) {
    if (req.query.month) {
      matchCriteria.date = {
        $gte: new Date(req.query.year, req.query.month - 1, 1), //2021-12-31T23:00:00.000Z -> 31 dec 2022 alle 23
        $lt: new Date(req.query.year, req.query.month, 1), //2022-12-31T23:00:00.000Z <- 31 dec 2022 alle 23
      };
    } else {
      matchCriteria.date = {
        $gte: new Date(req.query.year, 0, 1),
        $lt: new Date(Number(req.query.year) + 1, 0, 1),
      };
    }
  } else if (req.query.startYear && req.query.endYear) {
    matchCriteria.date = {
      $gte: new Date(req.query.startYear, 0, 1),
      $lt: new Date(Number(req.query.endYear) + 1, 0, 1),
    };
  }

  const stats = await Expense.aggregate([
    {
      $match: matchCriteria,
    },
    {
      $group: groupCriteria,
    },
  ]);

  if (stats.length === 0) {
    return res.status(200).json({
      message: 'No items found',
      data: {
        statistics: [],
      },
    });
  }

  const statistics = stats;

  res.status(200).json({
    status: 'success',
    data: {
      statistics,
    },
  });
});

exports.getDailyStats = catchAsync(async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.user.id);

  const matchCriteria = {
    user: userId,
  };
  const groupCriteria = {
    _id: {
      year: { $year: '$date' },
      month: { $month: '$date' },
      day: { $dayOfMonth: '$date' },
      category: '$category',
    },
    totalAmount: { $sum: '$amount' },
    averageAmount: { $avg: '$amount' },
    maxAmount: { $max: '$amount' },
    minAmount: { $min: '$amount' },
  };
  if (req.query.type && req.query.type !== 'all') {
    matchCriteria.type = req.query.type;
  }
  if (!req.query.year & !req.query.month) {
    res.status(401).json({
      message: 'Please provide year and month',
    });
  }
  matchCriteria.date = {
    $gte: new Date(req.query.year, req.query.month - 1, 1), //2021-12-31T23:00:00.000Z -> 31 dec 2022 alle 23
    $lt: new Date(req.query.year, req.query.month, 1), //2022-12-31T23:00:00.000Z <- 31 dec 2022 alle 23
  };
  const stats = await Expense.aggregate([
    {
      $match: matchCriteria,
    },
    {
      $group: groupCriteria,
    },
  ]);

  if (stats.length === 0) {
    return res.status(200).json({
      message: 'No items found',
      data: {
        statistics: [],
      },
    });
  }
  console.log(stats);
  const statistics = stats;

  res.status(200).json({
    status: 'success',
    data: {
      statistics,
    },
  });
});
