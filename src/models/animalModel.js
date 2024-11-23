const db = require('../db/db');

const animalModel = {
    getAll: () => {
        return db('animal as an')
            .join('tipo as t', 'an.tipo_idtipo', 't.idtipo')
            .select('an.idanimal', 'an.nome', 'an.sexo', 'an.status', 't.tipo AS tipo_animal', 't.raca AS raca_animal');
    },

    getById: (id) => {
        return db('animal as an')
            .join('tipo as t', 'an.tipo_idtipo', 't.idtipo')
            .select('an.idanimal', 'an.nome', 'an.sexo', 'an.status', 't.tipo AS tipo_animal', 't.raca AS raca_animal')
            .where('an.idanimal', id)
            .first();
    },

    create: async (data) => {
        return db('animal')
            .insert({
                nome: data.nome,
                sexo: data.sexo,
                status: data.status,
                tipo_idtipo: data.tipo_idtipo,
            })
            .returning('idanimal');
    },

    update: (id, data) => {
        return db('animal')
            .where('idanimal', id)
            .update({
                nome: data.nome,
                sexo: data.sexo,
                status: data.status,
                tipo_idtipo: data.tipo_idtipo,
            })
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Animal não encontrado');
                }
                return { message: 'Animal atualizado com sucesso' };
            });
    },

    delete: (id) => {
        return db('animal')
            .where('idanimal', id)
            .del()
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Animal não encontrado');
                }
                return { message: 'Animal deletado com sucesso' };
            });
    },
};

module.exports = animalModel;
