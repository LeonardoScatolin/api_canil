const adocoesModel = require('../models/adocoesModel');

const adocoesController = {
  getAll: async (req, res) => {
    try {
      const results = await adocoesModel.getAll();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await adocoesModel.getById(id);
      if (!result) {
        return res.status(404).json({ message: 'Adoção não encontrada' });
      }
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const [id] = await adocoesModel.create(req.body);
      res.status(201).json({ message: "Adoção cadastrada", id });
    } catch (err) {
      if (err.message === 'Usuário não encontrado' || err.message === 'Animal não encontrado') {
        return res.status(404).json({ error: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await adocoesModel.update(id, req.body);
      res.json(result);
    } catch (err) {
      if (err.message === 'Adoção não encontrada') {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await adocoesModel.delete(id);
      res.json(result);
    } catch (err) {
      if (err.message === 'Adoção não encontrada') {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = adocoesController;
