'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Tasks', [{
      title: 'Comprar mantimentos',
      description:'Ir ao supermercado',
      isFavorite:false,
      color:'#123'
    },
    {
      title: 'Estudar React',
      description:'Fazer exercícios práticos',
      isFavorite: true, 
      color:'#2423'
    },
    {
      title: 'Fazer exercícios físicos',  
      description:'Correr por 30 minutos',
      isFavorite: true,
      color:'#123'
    }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
