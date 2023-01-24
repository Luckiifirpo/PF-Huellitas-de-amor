const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('usuario', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: {
        isUUID: 4,
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$"],
          msg: 'Campo name - Debe ser una palabra'
        }
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$"],
          msg: 'Campo surname - Debe ser una palabra'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    work: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-zA-Z-,][A-Za-z0-9]*[0-9][A-Za-z0-9"],
          msg: 'Campo passwrod - Debe ser un conjunto de caracteres, donde cada uno consiste de una letra mayuscula, o un digito. la contraseña debe empezar con una letra y contener al menos un digito'
        }
      }
    },
    federatedUID: {
      type: DataTypes.STRING,
      unique: true
    }
  });
};
