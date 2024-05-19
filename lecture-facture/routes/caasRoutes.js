const express = require('express');
const router = express.Router();
const caasController = require('../controllers/caasController');

// Route to extract data using CaaS API
router.post('/extract', caasController.extractData);

module.exports = router;
