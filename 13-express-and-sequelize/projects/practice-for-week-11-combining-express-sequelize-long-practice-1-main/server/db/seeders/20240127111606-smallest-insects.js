'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Insects', [
      {
        name: 'Western Pygmy Blue Butterfly',
        millimeters: 12
      },
      {
        name: 'Patu Digua Spider',
        millimeters: 0.3
      },
      {
        name: 'Scarlet Dwarf Dragonfly',
        millimeters: 200
      }
      
    ])


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Insects', {
      name:['Western Pygmy Blue Butterfly', 'Patu Digua Spider', 'Scarlet Dwarf Dragonfly']
    })
  }
};
