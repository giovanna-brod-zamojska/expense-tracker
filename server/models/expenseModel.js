const mongoose = require('mongoose');
const validator = require('validator');

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount required.'],
    },
    type: {
      type: String,
      required: [true, 'The amount should be either an income or an expense.'],
      enum: ['expense', 'income'],
    },
    valuta: {
      type: String,
      default: 'EUR',
      enum: ['EUR', 'USD'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
    category: {
      type: String,
      required: true,
      default: 'other',
    },
    description: {
      type: String,
      trim: true,
      maxLength: [50, 'The description can have only 30 chars.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// QUERY MIDDLEWARE
/* expenseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
}); */

/* expenseSchema.statics.calcAverageExpense = async function (userId) {
  const stats = await this.aggregate([
    {
      $match: { user: userId },
    },
    {
      $group: {
        _id: '$tour',
        avgExpense: { $avg: '$amount' },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].numRatings,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: undefined,
      ratingsAverage: 4.5,
    });
  }
};

expenseSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.user);
});

expenseSchema.pre(/^findOneAnd/, async function (next) {
  // retrieve current doc and store in a query variable
  this.expense = await this.findOne();
  console.log(this.expense);
  // pass it to the next middleware
  next();
});

expenseSchema.post(/^findOneAnd/, async function () {
  await this.expense.constructor.calcAverageRatings(this.expense.tour);
}); */

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
