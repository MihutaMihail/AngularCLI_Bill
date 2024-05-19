const express = require('express');
const router = express.Router();
const extractedDataController = require('../controllers/extractedDataController');

// Route to get all extracted data
router.get('/', extractedDataController.getAllExtractedData);

// Route to get extracted data by ID
router.get('/:id', extractedDataController.getExtractedDataById);

// Route to update extracted data field by ID
router.put('/:id/:field', extractedDataController.updateExtractedDataField);

// Route to delete extracted data by ID
router.delete('/:id', extractedDataController.deleteExtractedDataById);

module.exports = router;
