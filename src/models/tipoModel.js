const db = require('../db/db');

const tipoModel = {
    getAll: () => {
        return db('tipo')
            .select('idtipo', 'tipo', 'raca');
    },

    getById: (id) => {
        return db('tipo')
            .select('idtipo', 'tipo', 'raca')
            .where('idtipo', id)
            .first();
    },

    create: async (data) => {
        return db('tipo')
            .insert({
                tipo: data.tipo,
                raca: data.raca,
            })
            .returning('idtipo');
    },

    update: (id, data) => {
        return db('tipo')
            .where('idtipo', id)
            .update({
                tipo: data.tipo,
                raca: data.raca,
            })
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Tipo não encontrado');
                }
                return { message: 'Tipo atualizado com sucesso' };
            });
    },

    delete: (id) => {
        return db('tipo')
            .where('idtipo', id)
            .del()
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Tipo não encontrado');
                }
                return { message: 'Tipo deletado com sucesso' };
            });
    },
};

module.exports = tipoModel;
