const express = require('express');
const router = express.Router();
const adocoesController = require('../controller/adocoesController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', adocoesController.getAll);
router.get('/:id', adocoesController.getById);

// Rotas privadas
router.post('/', adocoesController.create);
router.put('/:id', adocoesController.update);
router.delete('/:id', adocoesController.delete);

module.exports = router;
