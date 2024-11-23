const veterinarioModel = require('../models/veterinarioModel');

const veterinarioController = {
    getAll: async (req, res) => {
        try {
            const results = await veterinarioModel.getAll();
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await veterinarioModel.getById(id);
            if (!result) {
                return res.status(404).json({ message: 'Veterinário não encontrado' });
            }
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const [id] = await veterinarioModel.create(req.body);
            res.status(201).json({ message: "Veterinário cadastrado", id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await veterinarioModel.update(id, req.body);
            res.json(result);
        } catch (err) {
            if (err.message === 'Veterinário não encontrado') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await veterinarioModel.delete(id);
            res.json(result);
        } catch (err) {
            if (err.message === 'Veterinário não encontrado') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = veterinarioController;
