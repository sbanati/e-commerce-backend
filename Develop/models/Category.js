const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}
// define columns for category table 
Category.init(
  {
    // define the column id 
    id: {
      type:DataTypes.INTEGER, // sets the data type to INTEGER
      allowNull:false, // doesnt allow NULL values
      primaryKey:true, // Sets the primary key
      autoIncrement:true, // Auto increments the value for new records
    },
    // defines the column category_name
    category_name: {
      type:DataTypes.STRING, // sets the data type to INTEGER
      allowNull:false, // doesnt allow NULL values
    }, 
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
