const UUID = require("uuid-js")

const generateId = () => {
    let id = UUID.create();
    const stringId = id.toString();

    return stringId
} 
const generateDate = () =>{
    let fechaActual = new Date()
      
    return fechaActual.toDateString();
        
    
}

module.exports = {
    generateId,
    generateDate,
}