const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/', statsController.getAll);
router.post('/visit', statsController.registerVisit);
router.post('/downloads/catalogue', statsController.registerCatalogueDownload);

module.exports = router;