require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

fs.readdirSync(path.join(__dirname, '/models/AdoptionRequest'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models/AdoptionRequest', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Animal, Usuario, Contactus, Admin, AdoptionRequest, ApplicantsResidence, PersonalReference, PreviousPet, PreviousPetsVaccine, ResidencesTenant, TenantsPsychologicalData, Review } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Usuario.hasMany(Animal, { foreignKey: 'idUsuario' });
Animal.belongsTo(Usuario, { foreignKey: 'idUsuario' });

Contactus.belongsToMany(Admin, { through: 'idAdminContactus' })
// Admin.belongsToMany(Contactus,{through: 'idAdminContactus'})

//ADOPTION REQUEST RELATIONS

//Usuario -> AdoptionRequest
Usuario.hasOne(AdoptionRequest, { as: 'adoptionRequest', foreignKey: "applicantId" });
AdoptionRequest.belongsTo(Usuario, { as: 'applicant', foreignKey: "applicantId" });

//Animal -> AdoptionRequest
Animal.hasOne(AdoptionRequest, { as: 'adoptionRequest', foreignKey: "toBeAdoptedId" });
AdoptionRequest.belongsTo(Animal, { as: 'toBeAdopted', foreignKey: "toBeAdoptedId" });

//AdoptionRequest -> ApplicantsResidence
AdoptionRequest.hasMany(ApplicantsResidence, { as: 'applicantsResidence', foreignKey: "adoptionRequestId" });
ApplicantsResidence.belongsTo(AdoptionRequest, { as: 'adoptionRequest', foreignKey: "adoptionRequestId" });

//AdoptionRequest -> PersonalReference
AdoptionRequest.hasMany(PersonalReference, { as: 'personalReference', foreignKey: "adoptionRequestId" });
PersonalReference.belongsTo(AdoptionRequest, { as: 'adoptionRequest', foreignKey: "adoptionRequestId" });

//AdoptionRequest -> PreviousPet
AdoptionRequest.hasMany(PreviousPet, { as: 'previousPet', foreignKey: "adoptionRequestId" });
PreviousPet.belongsTo(AdoptionRequest, { as: 'adoptionRequest', foreignKey: "adoptionRequestId" });

//AdoptionRequest -> ResidencesTenant
AdoptionRequest.hasMany(ResidencesTenant, { as: 'residencesTenant', foreignKey: "adoptionRequestId" });
ResidencesTenant.belongsTo(AdoptionRequest, { as: 'adoptionRequest', foreignKey: "adoptionRequestId" });

//AdoptionRequest -> TenantsPsychologicalData
AdoptionRequest.hasOne(TenantsPsychologicalData, { as: 'applicantsPsychologicalData', foreignKey: "adoptionRequestId" });
TenantsPsychologicalData.belongsTo(AdoptionRequest, { as: 'adoptionRequest', foreignKey: "adoptionRequestId" });

//ResidencesTenant -> TenantsPsychologicalData
ResidencesTenant.hasOne(TenantsPsychologicalData, { as: 'tenantPsychologicalData', foreignKey: "residencesTenantId" });
TenantsPsychologicalData.belongsTo(ResidencesTenant, { as: 'residencesTenant', foreignKey: "residencesTenantId" });

//PreviousPet -> PreviousPetsVaccine
PreviousPet.hasMany(PreviousPetsVaccine, { as: 'previousPetVaccine', foreignKey: "previousPetId" });
PreviousPetsVaccine.belongsTo(PreviousPet, { as: 'previousPet', foreignKey: "previousPetId" });

//Animal -> Review
Animal.hasMany(Review);
Review.belongsTo(Animal);

//Usuario -> Rview
Usuario.hasMany(Review);
Review.belongsTo(Usuario);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
