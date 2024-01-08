
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const expenseRoutes = require('./routes/expenseroutes');

const app = express();

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', expenseRoutes);

// Sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database and tables synced');
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
