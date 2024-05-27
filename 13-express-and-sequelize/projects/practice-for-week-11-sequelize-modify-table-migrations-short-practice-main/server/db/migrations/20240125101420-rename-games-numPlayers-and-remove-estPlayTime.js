'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // change column name:
    await queryInterface.renameColumn('Games', 'numPlayers', 'maxPlayers');

    // remove estPlayTime column:
    await queryInterface.removeColumn('Games', 'estPlayTime');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    
    // return column name to numPlayers
    await queryInterface.renameColumn('Games', 'maxPlayers', 'numPlayers');

    // return column 'estPlayTime'
    await queryInterface.addColumn('Games', 'estPlayTime', Sequelize.DataTypes.INTEGER);
  }
};
