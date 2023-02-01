require("dotenv").config()
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {PORT} = process.env
// Syncing all the models at once.



conn.sync({ force: true }).then(() => {

  server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`) // eslint-disable-line no-console
  });
});
