const db = require('../db/db');

const veterinarioModel = {
    getAll: () => {
        return db('veterinario')
            .select('idveterinario', 'nome', 'telefone', 'email', 'crmv');
    },

    getById: (id) => {
        return db('veterinario')
            .select('idveterinario', 'nome', 'telefone', 'email', 'crmv')
            .where('idveterinario', id)
            .first();
    },

    create: async (data) => {
        return db('veterinario')
            .insert({
                nome: data.nome,
                telefone: data.telefone,
                email: data.email,
                crmv: data.crmv,
            })
            .returning('idveterinario');
    },

    update: (id, data) => {
        return db('veterinario')
            .where('idveterinario', id)
            .update({
                nome: data.nome,
                telefone: data.telefone,
                email: data.email,
                crmv: data.crmv,
            })
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Veterinário não encontrado');
                }
                return { message: 'Veterinário atualizado com sucesso' };
            });
    },

    delete: (id) => {
        return db('veterinario')
            .where('idveterinario', id)
            .del()
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Veterinário não encontrado');
                }
                return { message: 'Veterinário deletado com sucesso' };
            });
    },
};

module.exports = veterinarioModel;
