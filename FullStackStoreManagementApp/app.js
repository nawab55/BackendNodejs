
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const productsRoutes = require('./routes/productsRoutes');

const app = express();
const PORT = 3000;

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', productsRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

