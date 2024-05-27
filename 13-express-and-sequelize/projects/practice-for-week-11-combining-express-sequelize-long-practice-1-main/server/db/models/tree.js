'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tree extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tree.init({
    tree: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    location: {
      type: DataTypes.STRING
    },
    height_ft: { 
      type: DataTypes.FLOAT,
      validate: {
        isGreaterThanZero
      }
    },
    ground_circumference_ft: {
      type: DataTypes.FLOAT,
      validate: {
        isGreaterThanZero
      }
    },
  }, {
    sequelize,
    modelName: 'Tree',
  });
  return Tree;
};

function isGreaterThanZero(value) {
  console.log('O valor que recebi foi', value);
  if (value <= 0) {
    throw new Error("Value has to be greater than zero")
  }
}