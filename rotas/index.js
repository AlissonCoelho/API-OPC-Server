//importar 
const opcua = require('./opcua');
const usuarios = require('./usuarios');
const token = require('./token');

module.exports = app => {
    app.post('/admin/criarUsuario', async (req, res) => {
        await token.checarToken(req).then((err, msg) => {
            if (err) {
                res.status(500).send(`error: ${msg}`);
                console.log(`error: ${msg}`);
            }
            else {
                console.log(`creatUser`);
                usuarios.creatUser(req, res);
            }
        }).catch((err) => {
            res.status(500).send(`error: ${err}`);
        });

    });   

    app.post('/login', (req, res) => {
        usuarios.login(req, res);
    });

    app.get('/logout', (req, res) => {
        usuarios.logout(req, res);
    });

    app.get('/conectar', async (req, res) => {
        await token.checarToken(req).then((err, msg) => {
            if (err) {
                res.status(500).send(`error: ${msg}`);
                console.log(`error: ${msg}`);
            }
            else {
                console.log(`conectar`);
                opcua.conect(req, res);
            }
        }).catch((err) => {
            res.status(500).send(`error: ${err}`);
        });

    });

    app.get('/desconectar', async (req, res) => {
        await token.checarToken(req).then((err, msg) => {
            if (err) {
                res.status(500).send(`error: ${msg}`);
                console.log(`error: ${msg}`);
            }
            else {
                console.log(`desconectar`);
                opcua.disconnect(req, res);
            }
        }).catch((err) => {
            res.status(500).send(`error: ${err}`);
        });

    });

    app.get('/lerVariavel', async (req, res) => {
        await token.checarToken(req).then((err, msg) => {
            if (err) {
                res.status(500).send(`error: ${msg}`);
                console.log(`error: ${msg}`);
            }
            else {
                console.log(`lerVariavel`);
                opcua.readVariable(req, res);
            }
        }).catch((err) => {
            res.status(500).send(`error: ${err}`);
        });
    });
    
}