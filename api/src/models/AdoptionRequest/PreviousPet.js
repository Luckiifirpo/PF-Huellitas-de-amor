const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('previousPet', {
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
        isAlive: {
            type: DataTypes.STRING,
            validate: {
                isIn: [["unknown", "yes", "no"]]
            }
        },
        stillPreserved : {
            type: DataTypes.BOOLEAN
        },
        age: {
            type: DataTypes.INTEGER
        },
        species: {
            type: DataTypes.STRING
        },
        details: {
            type: DataTypes.STRING
        }
    })
}