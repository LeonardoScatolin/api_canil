const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para login
router.post('/login', userController.login);

// Rotas públicas
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

// Rotas privadas
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;

