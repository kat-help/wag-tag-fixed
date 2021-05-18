
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class PetImage extends Model {}

PetImage.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'image',
          key: 'id'
      }
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'petimage',
  }
);

module.exports = PetImage;