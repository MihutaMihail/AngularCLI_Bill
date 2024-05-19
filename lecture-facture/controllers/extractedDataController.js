const { readExtractedData, writeExtractedData } = require('../models/extractedDataModel');

// Controller function to retrieve all extracted data
const getAllExtractedData = (req, res) => {
  try {
    const extractedData = readExtractedData();
    res.json(extractedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to retrieve extracted data by ID
const getExtractedDataById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const extractedData = readExtractedData();
    const data = extractedData.find(item => item.id === id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update extracted data field by ID
const updateExtractedDataField = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const fieldToUpdate = req.params.field;
    let newValue = req.body;

    // Ensure newValue is always a string
    if (typeof newValue !== 'string') {
      newValue = String(newValue);
    }

    const extractedData = readExtractedData();
    const index = extractedData.findIndex(item => item.id === id);
    if (index !== -1) {
      // Update the specified field
      extractedData[index].fieldValues[fieldToUpdate] = newValue;
      writeExtractedData(extractedData);
      res.json({ message: `Field '${fieldToUpdate}' updated successfully` });
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete extracted data by ID
const deleteExtractedDataById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const extractedData = readExtractedData();
    const filteredData = extractedData.filter(item => item.id !== id);
    if (filteredData.length < extractedData.length) {
      writeExtractedData(filteredData);
      res.json({ message: 'Data deleted successfully' });
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllExtractedData,
  getExtractedDataById,
  updateExtractedDataField,
  deleteExtractedDataById
};
