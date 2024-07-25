const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

// Twilio configuration
const accountSid = 'AC40ef6b4619182dbf6999f84c7f795c1c';
const authToken = '09de70e224c2413b3514761c2781574b';
const client = new twilio(accountSid, authToken);

const users = JSON.parse(fs.readFileSync('users.json'));

app.post('/api/heart-rate', (req, res) => {
    const { userId, heartRate } = req.body;

    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (heartRate > 140 || heartRate < 40) {
        // Send SMS alert
        client.messages.create({
            body: `Alert! The heart rate of ${userId} is ${heartRate}.`,
            from: '+17629851195',
            to: user.caretakerPhone
        }).then(message => console.log(message.sid)).catch(err => console.error(err));
    }

    res.json({ message: 'Heart rate recorded' });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
