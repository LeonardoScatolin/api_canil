const adotanteModel = require('../models/adotanteModel');

const adotanteController = {
    getAll: async (req, res) => {
        try {
            const results = await adotanteModel.getAll();
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await adotanteModel.getById(id);
            if (!result) {
                return res.status(404).json({ message: 'Adotante não encontrado' });
            }
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const [id] = await adotanteModel.create(req.body);
            res.status(201).json({ message: "Adotante cadastrado", id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await adotanteModel.update(id, req.body);
            res.json(result);
        } catch (err) {
            if (err.message === 'Adotante não encontrado') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await adotanteModel.delete(id);
            res.json(result);
        } catch (err) {
            if (err.message === 'Adotante não encontrado') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = adotanteController;
