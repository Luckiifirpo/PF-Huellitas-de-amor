const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('previousPetsVaccine', {
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
        appliedOn: {
            type: DataTypes.DATE
        }
    })
}