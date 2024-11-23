const tipoModel = require('../models/tipoModel');

const tipoController = {
    getAll: async (req, res) => {
        try {
            const results = await tipoModel.getAll();
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await tipoModel.getById(id);
            if (!result) {
                return res.status(404).json({ message: 'Tipo não encontrado' });
            }
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const [id] = await tipoModel.create(req.body);
            res.status(201).json({ message: "Tipo cadastrado", id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await tipoModel.update(id, req.body);
            res.json(result);
        } catch (err) {
            if (err.message === 'Tipo não encontrado') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await tipoModel.delete(id);
            res.json(result);
        } catch (err) {
            if (err.message === 'Tipo não encontrado') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = tipoController;