const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {  
    id:{
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      }, 
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rate: {
        type: DataTypes.ENUM('1','2','3','5'),
        allowNull: false,
    }
  });
};
