const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Define routes for saving and reading JSON data
const dataDirectory = path.join(__dirname, '../json');
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

// Endpoint to save JSON data
router.post('/saveData', (req, res) => {
  const { filename, data } = req.body;
  if (!filename || !data) {
    return res.status(400).send('Filename and data are required');
  }

  const filePath = path.join(dataDirectory, `${filename}.json`);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error saving data');
    }
    res.status(200).json({ message: 'Data saved successfully' });
  });
});

// Endpoint to read JSON files
router.get('/getData', (req, res) => {
  fs.readdir(dataDirectory, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading data directory');
    }

    const jsonFiles = files.filter(file => file.endsWith('.json'));
    const data = jsonFiles.map(file => {
      const content = fs.readFileSync(path.join(dataDirectory, file));
      return JSON.parse(content);
    });

    res.status(200).json(data);
  });
});

module.exports = router;
