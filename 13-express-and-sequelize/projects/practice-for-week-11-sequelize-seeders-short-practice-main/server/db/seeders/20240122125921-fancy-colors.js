'use strict';

const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Colors', [{
      name: 'Pink',
      createdAt: new Date("2024-01-22T00:00:01"),
      updatedAt: new Date("2024-01-22T00:00:02")
    },
    {
      name: 'Purple',
      createdAt: new Date("2024-01-22T00:00:03"),
      updatedAt: new Date("2024-01-22T00:00:04")
    }
  
    ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Colors',{
      name: ["Pink", "Purple"]
    })
  }
};
