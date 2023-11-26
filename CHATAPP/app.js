const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const LocalStorage = require('node-localstorage').LocalStorage;

const localStorage = new LocalStorage('./scratch');
const app = express();
const PORT = 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login form
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <label for="username">Enter your username:</label>
      <input type="text" id="username" name="username" required>
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle the login form submission
app.post('/login', (req, res) => {
  const { username } = req.body;

  // Store username in local storage on the server side
  localStorage.setItem('username', username);

  // Redirect to the main page
  res.redirect("/");
});

// Serve the main page with a form to send messages
app.get('/', (req, res) => {
  const username = localStorage.getItem('username') || 'Anonymous';

  // Read messages from the file
  fs.readFile('messages.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const messages = data || '';
      res.send(`
        <h1>Hello, ${username}!</h1>
        <form action="/send" method="post">
          <label for="message">Send a message:</label>
          <input type="text" id="message" name="message" required>
          <button type="submit">Send</button>
        </form>
        <h2>Messages:</h2>
        <pre>${messages}</pre>
      `);
    }
  });
});

// Handle sending messages
app.post('/send', (req, res) => {
  const username = localStorage.getItem('username') || 'Anonymous';
  const message = req.body.message;

  // Store the message in a file
  const data = `"${username}": "${message}"\n`;
  fs.appendFile('messages.txt', data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      // Redirect back to the main page after sending a message
      res.redirect("/");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
