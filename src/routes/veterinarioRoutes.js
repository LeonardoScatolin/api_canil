const express = require('express');
const router = express.Router();
const veterinarioController = require('../controller/veterinarioController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', veterinarioController.getAll);
router.get('/:id', veterinarioController.getById);

// Rotas protegidas
router.post('/', veterinarioController.create);
router.put('/:id', veterinarioController.update);
router.delete('/:id',  veterinarioController.delete);

module.exports = router;
