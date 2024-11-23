const db = require('../db/db');

const consultasModel = {
    getAll: () => {
        return db('consultas as c')
            .join('animal as an', 'c.animal_idanimal', 'an.idanimal')
            .join('veterinario as v', 'c.veterinario_idveterinario', 'v.idveterinario')
            .select('c.idconsultas', 'c.dataconsulta', 'c.motivo', 'c.prescricao', 'an.nome as nome_animal', 'v.nome as nome_veterinario');
    },

    getById: (id) => {
        return db('consultas as c')
            .join('animal as an', 'c.animal_idanimal', 'an.idanimal')
            .join('veterinario as v', 'c.veterinario_idveterinario', 'v.idveterinario')
            .select('c.idconsultas', 'c.dataconsulta', 'c.motivo', 'c.prescricao', 'an.nome as nome_animal', 'v.nome as nome_veterinario')
            .where('c.idconsultas', id)
            .first();
    },

    create: async (data) => {
        return db('consultas')
            .insert({
                dataconsulta: data.dataconsulta,
                motivo: data.motivo,
                prescricao: data.prescricao,
                animal_idanimal: data.animal_idanimal,
                veterinario_idveterinario: data.veterinario_idveterinario,
            })
            .returning('idconsultas');
    },

    update: (id, data) => {
        return db('consultas')
            .where('idconsultas', id)
            .update({
                dataconsulta: data.dataconsulta,
                motivo: data.motivo,
                prescricao: data.prescricao,
                animal_idanimal: data.animal_idanimal,
                veterinario_idveterinario: data.veterinario_idveterinario,
            })
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Consulta não encontrada');
                }
                return { message: 'Consulta atualizada com sucesso' };
            });
    },

    delete: (id) => {
        return db('consultas')
            .where('idconsultas', id)
            .del()
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Consulta não encontrada');
                }
                return { message: 'Consulta deletada com sucesso' };
            });
    },
};

module.exports = consultasModel;
