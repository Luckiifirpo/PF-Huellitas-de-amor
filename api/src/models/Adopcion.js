const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('adopcion', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
