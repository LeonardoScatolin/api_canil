const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {
    login: async (req, res) => {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ 
                    message: 'Email e senha são obrigatórios' 
                });
            }

            const user = await userModel.findUser(email, senha);

            if (!user) {
                return res.status(401).json({ 
                    message: 'Email ou senha incorretos' 
                });
            }

            const token = jwt.sign(
                {
                    id: user.idusuario,
                    nome: user.nome,
                    role: user.role,
                    email: user.email
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.json({
                token,
                user
            });

        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).json({ 
                message: 'Erro interno do servidor' 
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await userModel.getAll();
            return res.json(users);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return res.status(500).json({ 
                message: 'Erro ao buscar usuários' 
            });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await userModel.getById(id);

            if (!user) {
                return res.status(404).json({ 
                    message: 'Usuário não encontrado' 
                });
            }

            return res.json(user);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            return res.status(500).json({ 
                message: 'Erro ao buscar usuário' 
            });
        }
    },

    create: async (req, res) => {
        try {
            const newUser = await userModel.create(req.body);
            return res.status(201).json({
                message: 'Usuário criado com sucesso',
                user: newUser
            });
        } catch (error) {
            if (error.message === 'Usuário já existe') {
                return res.status(409).json({ 
                    message: error.message 
                });
            }
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ 
                message: 'Erro ao criar usuário' 
            });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedUser = await userModel.update(id, req.body);
            return res.json({
                message: 'Usuário atualizado com sucesso',
                user: updatedUser
            });
        } catch (error) {
            if (error.message === 'Usuário não encontrado') {
                return res.status(404).json({ 
                    message: error.message 
                });
            }
            console.error('Erro ao atualizar usuário:', error);
            return res.status(500).json({ 
                message: 'Erro ao atualizar usuário' 
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await userModel.delete(id);
            return res.json({ 
                message: 'Usuário deletado com sucesso' 
            });
        } catch (error) {
            if (error.message === 'Usuário não encontrado') {
                return res.status(404).json({ 
                    message: error.message 
                });
            }
            console.error('Erro ao deletar usuário:', error);
            return res.status(500).json({ 
                message: 'Erro ao deletar usuário' 
            });
        }
    }
};

module.exports = userController;
