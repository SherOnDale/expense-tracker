const express = require('express');
const expenseRouer = require('./routes/expense.route');
const budgetRouter = require('./routes/budget.route');

const app = express();
app.use(express.json());

app.use('/expense', expenseRouer);
app.use('/budget', budgetRouter);

app.listen(5000);
