const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('residencesTenant', {
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
        allergies: {
            type: DataTypes.STRING
        }
    })
}