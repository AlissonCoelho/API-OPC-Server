//importar 
const opcua = require('./opcua');

module.exports = app => {
    app.get('/conectar', (req, res) => {
        opcua.conect(req, res);
    });
    app.get('/desconectar', (req, res) => {
        opcua.disconnect(req, res);
    });
    app.get('/lerVariavel', (req, res) => {
        opcua.readVariable(req, res);
    });
}