const UUID = require("uuid-js")

const generateId = () => {
    let id = UUID.create();
    const stringId = id.toString();

    return stringId
}
module.exports = {
    generateId,
}