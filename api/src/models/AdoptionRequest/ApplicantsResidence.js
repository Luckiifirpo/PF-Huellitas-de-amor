const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('applicantsResidence', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        actualResidence: {
            type: DataTypes.BOOLEAN
        },
        type: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[
                    "single-detached",
                    "semi-detached",
                    "duplex",
                    "in-building-apartment",
                    "movable dwelling"
                ]]
            }
        },
        ownHouse: {
            type: DataTypes.BOOLEAN
        },
        homeownerName: {
            type: DataTypes.STRING
        },
        homeownerSurname: {
            type: DataTypes.STRING
        },
        homeownerPhoneNumber: {
            type: DataTypes.STRING
        },
        withPatio: {
            type: DataTypes.BOOLEAN
        },
        withTerrace: {
            type: DataTypes.BOOLEAN
        },
        withGarden: {
            type: DataTypes.BOOLEAN
        },
        coveredPetArea: {
            type: DataTypes.BOOLEAN
        },
        petAreaDimension: {
            type: DataTypes.FLOAT
        }
    })
}