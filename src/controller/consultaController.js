const consultaModel = require('../models/consultasModel');

const consultaController = {
    getAll: async (req, res) => {
        try {
            const results = await consultaModel.getAll();
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await consultaModel.getById(id);
            if (!result) {
                return res.status(404).json({ message: 'Consulta não encontrada' });
            }
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const [id] = await consultaModel.create(req.body);
            res.status(201).json({ message: "Consulta cadastrada", id });
        } catch (err) {
            if (err.message === 'Animal não encontrado' || err.message === 'Veterinário não encontrado') {
                return res.status(404).json({ error: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await consultaModel.update(id, req.body);
            res.json(result);
        } catch (err) {
            if (err.message === 'Consulta não encontrada') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await consultaModel.delete(id);
            res.json(result);
        } catch (err) {
            if (err.message === 'Consulta não encontrada') {
                return res.status(404).json({ message: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = consultaController;
