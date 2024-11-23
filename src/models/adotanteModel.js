const db = require('../db/db');

const adotanteModel = {
    getAll: () => {
        return db('adotante')
            .select('idadotante', 'nome', 'email', 'endereco', 'cpf', 'telefone');
    },

    getById: (id) => {
        return db('adotante')
            .select('idadotante', 'nome', 'email', 'endereco', 'cpf', 'telefone')
            .where('idadotante', id)
            .first();
    },

    create: async (data) => {
        return db('adotante')
            .insert({
                nome: data.nome,
                email: data.email,
                endereco: data.endereco,
                cpf: data.cpf,
                telefone: data.telefone
            })
            .returning('idadotante');
    },

    update: (id, data) => {
        return db('adotante')
            .where('idadotante', id)
            .update({
                nome: data.nome,
                email: data.email,
                endereco: data.endereco,
                cpf: data.cpf,
                telefone: data.telefone
            })
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Adotante não encontrado');
                }
                return { message: 'Adotante atualizado com sucesso' };
            });
    },

    delete: (id) => {
        return db('adotante')
            .where('idadotante', id)
            .del()
            .then((affectedRows) => {
                if (affectedRows === 0) {
                    throw new Error('Adotante não encontrado');
                }
                return { message: 'Adotante deletado com sucesso' };
            });
    },
};

module.exports = adotanteModel;
