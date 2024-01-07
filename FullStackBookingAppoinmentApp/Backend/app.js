const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database model
const UserModel = require('./models/usermodel');

// Routes
const userRoutes = require('./routes/userroutes');


// Synchronize models with the database
// sequelize.sync();

// API routes
app.use('/user', userRoutes);

sequelize.sync()  // Sync the models with the database
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => console.log(err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });





// const express = require('express');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/userroutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use('/user', userRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
