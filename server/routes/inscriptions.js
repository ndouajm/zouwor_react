const express = require('express');
const router = express.Router();
const inscriptionController = require('../controllers/inscriptionController');

router.get('/', inscriptionController.getAll);
router.get('/:id', inscriptionController.getOne);
router.post('/', inscriptionController.create);
router.put('/:id', inscriptionController.update);
router.delete('/:id', inscriptionController.remove);

module.exports = router;