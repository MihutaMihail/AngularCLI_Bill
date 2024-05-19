const fs = require('fs');

// Function to read existing extracted data from JSON file
const readExtractedData = () => {
  try {
    let extractedData = [];
    if (fs.existsSync('extractedData.json')) {
      const jsonData = fs.readFileSync('extractedData.json', 'utf8');
      if (jsonData.trim() !== '') {
        extractedData = JSON.parse(jsonData);
      }
    }
    return extractedData;
  } catch (error) {
    throw new Error('Error reading extracted data:', error.message);
  }
};

// Function to write extracted data to JSON file
const writeExtractedData = (data) => {
  try {
    fs.writeFileSync('extractedData.json', JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error('Error writing extracted data:', error.message);
  }
};

module.exports = {
  readExtractedData,
  writeExtractedData
};
