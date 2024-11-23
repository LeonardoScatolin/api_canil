const animalModel = require('../models/animalModel');

const animalController = {
    getAll: async (req, res) => {
        try {
            const results = await animalModel.getAll();
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await animalModel.getById(id);
            if (!result) {
                return res.status(404).json({ message: 'Animal não encontrado' });
            }
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const [id] = await animalModel.create(req.body);
            res.status(201).json({ message: "Animal cadastrado", id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await animalModel.update(id, req.body);
            res.json(result);
        } catch (err) {
            if (err.message === 'Animal não encontrado') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await animalModel.delete(id);
            res.json(result);
        } catch (err) {
            if (err.message === 'Animal não encontrado') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = animalController;
