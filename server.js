const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const data = req.body;
    fs.readFile('data.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Server Error');
        }

        const jsonData = JSON.parse(jsonString || '[]');
        jsonData.push(data);

        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), err => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Server Error');
            }
            res.send({ message: 'Data saved successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
