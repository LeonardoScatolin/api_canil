const db = require('../db/db');

const userModel = {
    findUser: async (email, senha) => {
        try {
            const user = await db('usuario')
                .where({ email, senha }) // Comparação direta de email e senha
                .first();

            if (!user) {
                return null;
            }

            return {
                idusuario: user.idusuario,
                nome: user.nome,
                email: user.email,
                role: user.role,
                senha: user.senha
            };
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    },

    getAll: () => {
        return db('usuario')
            .select('idusuario', 'nome', 'email', 'role', 'senha')
            .orderBy('idusuario');
    },

    getById: (id) => {
        return db('usuario')
            .where('idusuario', id)
            .select('idusuario', 'nome', 'email', 'role', 'senha')
            .first();
    },

    create: async (data) => {
        try {
            const userExists = await db('usuario')
                .where('email', data.email)
                .first();

            if (userExists) {
                throw new Error('Usuário já existe');
            }

            const [newUser] = await db('usuario').insert({
                nome: data.nome,
                email: data.email,
                senha: data.senha, // Senha sem hash
                role: data.role || 'user'
            }).returning(['idusuario', 'nome', 'email', 'role', 'senha']);

            return newUser;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const updated = await db('usuario')
                .where('idusuario', id)
                .update(data)
                .returning(['idusuario', 'nome', 'email', 'role', 'senha']);

            if (!updated || updated.length === 0) {
                throw new Error('Usuário não encontrado');
            }

            return updated[0];
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const deleted = await db('usuario')
                .where('idusuario', id)
                .del();

            if (!deleted) {
                throw new Error('Usuário não encontrado');
            }

            return { message: 'Usuário deletado com sucesso' };
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }
};

module.exports = userModel;
