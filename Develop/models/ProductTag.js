const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type:DataTypes.INTEGER, // sets the data type to INTEGER
      allowNull: false, // doesnt allow NULL values
      primaryKey: true, // Sets the primary key
      autoIncrement: true, // Auto increments the value for new records
    },

    product_id: {
      type:DataTypes.INTEGER, // sets the data type to INTEGER
      references: {
        model: 'product', // references product table 
        key: 'id', // references id column in product table 
        unique: false 

      }
    },

    tag_id : {
      type:DataTypes.INTEGER, // sets the data type to INTEGER
      references: {
        model: 'tag', // reference the tag table 
        key: 'id', // reference the id column in tag table 
        unique: false,
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
