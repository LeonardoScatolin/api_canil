const express = require('express');
const router = express.Router();
const tipoController = require('../controller/tipoController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', tipoController.getAll);
router.get('/:id', tipoController.getById);

// Rotas privadas
router.post('/', authMiddleware(1), tipoController.create);
router.put('/:id', authMiddleware(1), tipoController.update);
router.delete('/:id', authMiddleware(1), tipoController.delete);

module.exports = router;
