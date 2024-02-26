const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: {
      type:DataTypes.INTEGER, // sets the data type to INTEGER
      allowNull:false, // doesnt allow NULL values
      primaryKey:true, // Sets the primary key
      autoIncrement:true, // Auto increments the value for new records
    },
    

    tag_name: {
      type:DataTypes.STRING, // sets the data type to STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
