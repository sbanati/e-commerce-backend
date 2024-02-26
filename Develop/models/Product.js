// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns for product table
    id: {
      type:DataTypes.INTEGER, // sets the data type to INTEGER
      allowNull:false, // doesnt allow NULL values
      primaryKey:true, // Sets the primary key
      autoIncrement:true, // Auto increments the value for new records
    },

    product_name: {
      type:DataTypes.STRING, // sets the data type to STRING
      allowNull:false, // doesnt allow NULL values
    }, 

    price: {
      type:DataTypes.DECIMAL, // sets the data type to DECIMAL
      allowNull:false, // doesnt allow NULL values
      validate: {
        isDecimal:true, // Validates the value is a decimal number
      }
    },

    stock: {
      type:DataTypes.INTEGER, // sets the data type to INTEGER
      allowNull:false, // doesnt allow NULL values
      defaultValue:10, // sets default value to 10
      validate: {
        isNumeric:true, // Validates the value is a nunber
      }
    },

    category_id: {
      type:DataTypes.INTEGER, // sets the data type to INTEGER
      references: {
        model: 'category', // References the category table 
        key: 'id',
        unique: false
      }
    }, 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
