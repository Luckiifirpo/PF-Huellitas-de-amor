const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('animal', {
    id:{
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publication: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    race: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false, 
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false, 
    }
  });
};
