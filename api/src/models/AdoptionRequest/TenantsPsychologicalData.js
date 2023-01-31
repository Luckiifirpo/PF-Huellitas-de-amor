const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tenantsPsychologicalData', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        withNoisyPet: {
            type: DataTypes.STRING
        },
        withHyperactivePet: {
            type: DataTypes.STRING
        },
        withCalmPet: {
            type: DataTypes.STRING
        },
        withNonObedientPet: {
            type: DataTypes.STRING
        },
        withUnwantedPetWaste: {
            type: DataTypes.STRING
        },
        withAggressivePet: {
            type: DataTypes.STRING
        },
        withBigPet: {
            type: DataTypes.STRING
        },
        withSmallPet: {
            type: DataTypes.STRING
        },
    })
}