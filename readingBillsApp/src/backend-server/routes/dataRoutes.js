const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Middleware to check for the secret key
function checkSecretKey(req, res, next) {
    const secretKey = req.headers['x-secret-key'];
    if (secretKey === 'd1sq3d5z1q-qh14jkh57-z140h335gs') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

// Define routes
router.get('/', dataController.getAllData);
router.get('/:id', dataController.getDataById);
router.put('/:id/:field', dataController.updateDataFieldById);
router.delete('/:id', dataController.deleteDataById);

router.post('/save', checkSecretKey, dataController.saveData);

// Export module
module.exports = router;