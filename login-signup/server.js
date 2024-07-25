const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please enter both username and password' });
    }

    fs.readFile('users.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        let users;
        try {
            users = JSON.parse(data);
        } catch (e) {
            users = [];
        }

        if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        users.push({ username, password });

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving user data' });
            }
            res.status(200).json({ message: 'Signup successful!' });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('users.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        let users;
        try {
            users = JSON.parse(data);
        } catch (e) {
            users = [];
        }

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            res.status(200).json({ message: 'Login successful!', redirectUrl: '/home' });
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    });
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../HOME/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});