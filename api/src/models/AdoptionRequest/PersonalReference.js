const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('personalReference', {
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
        },
        surname: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        hasAJob: {
            type: DataTypes.BOOLEAN,
        },
        occupation: {
            type: DataTypes.STRING,
        },
        relationship: {
            type: DataTypes.STRING,
        }
    })
}