const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('adoptionRequest', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        workplacePhoneNumber: {
            type: DataTypes.STRING,
        },
        educationalLevel: {
            type: DataTypes.STRING,
            validate: {
                isIn: [["none", "technician", "technologist", "professional"]]
            }
        },
        reasonForRequest: {
            type: DataTypes.STRING,
        },
        numberOfTenants: {
            type: DataTypes.INTEGER
        },
        allTenantsAgreeToAdoption: {
            type: DataTypes.BOOLEAN
        },
        acceptsPeriodicVisits: {
            type: DataTypes.BOOLEAN
        },
        plansToChangeResidence: {
            type: DataTypes.BOOLEAN
        },
        knowYourNextResidence: {
            type: DataTypes.BOOLEAN
        },
        childrenUnder10Years: {
            type: DataTypes.BOOLEAN
        },
        allergies: {
            type: DataTypes.STRING
        }
    });
}