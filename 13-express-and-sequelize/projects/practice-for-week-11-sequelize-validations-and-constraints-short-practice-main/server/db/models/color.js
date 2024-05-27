'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Color.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isBetween2and20,
        noEndingInY
      }
    }
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};

function isBetween2and20(value) {
  if (value.length < 2 || value.length > 20) {
    throw new Error ('name must be between 2 and 20 carachters')
  }
}

function noEndingInY(value) {
  if (value.slice(-1) === 'y' || value.slice(-1) === 'Y') {
    throw new Error ('name cannot end in \'y\' or \'Y\'');
  }
}