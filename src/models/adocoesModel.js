const db = require('../db/db');

const adocoesModel = {
  // Recupera todas as adoções
  getAll: () => {
    return db('adocoes as a')
      .join('adotante as ad', 'a.adotante_idadotante', 'ad.idadotante')
      .join('animal as an', 'a.animal_idanimal', 'an.idanimal')
      .join('tipo as t', 'an.tipo_idtipo', 't.idtipo')
      .select(
        'a.idadocoes',
        'a.dataadocao',
        'ad.nome AS nome_adotante',
        'an.idanimal AS id_animal',
        'an.nome AS nome_animal',
        't.tipo AS tipo_animal',
        't.raca AS raca_animal'
      );
  },

  // Recupera adoção por ID
  getById: (id) => {
    return db('adocoes as a')
      .join('adotante as ad', 'a.adotante_idadotante', 'ad.idadotante')
      .join('animal as an', 'a.animal_idanimal', 'an.idanimal')
      .join('tipo as t', 'an.tipo_idtipo', 't.idtipo')
      .select(
        'a.idadocoes',
        'a.dataadocao',
        'ad.idadotante AS id_adotante',
        'ad.nome AS nome_adotante',
        'an.idanimal AS id_animal',
        'an.nome AS nome_animal',
        't.tipo AS tipo_animal',
        't.raca AS raca_animal'
      )
      .where('a.idadocoes', id)
      .first();
  },

  // Cria uma nova adoção
  create: async (data) => {
    // Verificando se o adotante existe
    const adotanteExists = await db('adotante').where('idadotante', data.adotante_idadotante).first();  
    if (!adotanteExists) {
      throw new Error('Adotante não encontrado');
    }

    // Verificando se o animal existe
    const animalExists = await db('animal').where('idanimal', data.animal_idanimal).first();
    if (!animalExists) {
      throw new Error('Animal não encontrado');
    }

    // Inserindo a adoção
    return db('adocoes')
      .insert({
        dataadocao: data.dataadocao,
        animal_idanimal: data.animal_idanimal,
        adotante_idadotante: data.adotante_idadotante,  
      })
      .returning('idadocoes');
  },

  // Atualiza uma adoção existente
  update: (id, data) => {
    return db('adocoes')
      .where('idadocoes', id)
      .update({
        animal_idanimal: data.animal_idanimal,
        adotante_idadotante: data.adotante_idadotante,  // Corrigido para 'idadotante'
        dataadocao: data.dataadocao,
      })
      .then((affectedRows) => {
        if (affectedRows === 0) {
          throw new Error('Adoção não encontrada');
        }
        return { message: 'Adoção atualizada com sucesso' };
      });
  },

  // Deleta uma adoção
  delete: (id) => {
    return db('adocoes')
      .where('idadocoes', id)
      .del()
      .then((affectedRows) => {
        if (affectedRows === 0) {
          throw new Error('Adoção não encontrada');
        }
        return { message: 'Adoção deletada com sucesso' };
      });
  },
};

module.exports = adocoesModel;
