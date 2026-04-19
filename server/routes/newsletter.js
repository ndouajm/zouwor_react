const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

router.get('/', newsletterController.getAll);
router.post('/', newsletterController.create);
router.delete('/:id', newsletterController.remove);

module.exports = router;