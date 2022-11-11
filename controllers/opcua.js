//OPC UA
const { OPCUAClient, AttributeIds } = require('node-opcua');
const endpointURL = "opc.tcp://LAPTOP-HDHLV21D:49320";
const client = OPCUAClient.create({ endpointMustExist: false });

let the_session;
class OPCUA {
    async conect(req, res) {
        await client.connect(endpointURL, (err) => {
            if (err) {
                console.log(`cannt connect to endpont: ${err}`)
                res.status(502).send(`cannt connect to endpont: ${err}`);
            }
            else {
                console.log('connected!!');
                client.createSession((err, session) => {
                    if (err) {
                        console.log(`cannt create a session: ${err}`)
                        res.status(502).send(`cannt create a session: ${err}`);
                        return;
                    }
                    console.log(`seção criada`);
                    the_session = session;
                    res.status(200).send(`conectado e seção criada`);

                })
            }
        })
    };
    async disconnect(req, res) {
        client.closeSession(the_session, false).then(() => {
            client.disconnect().then(() => {
                the_session = null;
                console.log(`desconectado`);
                res.status(200).send(`desconectado`);
            }).catch(err => {
                console.log(`cannt disconnect: ${err}`);
                res.status(502).send(`cannt disconnect: ${err}`);
            })
        });
    };
    async readVariable(req, res) {
        if (!the_session) {
            console.log(`desconectado`)
            res.status(502).send(`desconectado`);
            return;
        }
        await the_session.read({ nodeId: "ns=2;s=MDB.PLC1.400100", attributeId: AttributeIds.Value }, (err, dataValue) => {
            if (!err) {
                console.log(`value: ${dataValue.value.value}`);
                res.status(200).send(`value: ${dataValue.value.value}`);
            }
        })
    }
    async motor(req, res) {
        if (!the_session) {
            console.log(`desconectado`)
            res.status(502).send(`desconectado`);
            return;
        }
        await the_session.read({ nodeId: "ns=2;s=MDB.PLC1.Motor", attributeId: AttributeIds.Value }, (err, dataValue) => {
            if (!err) {
                console.log(`Motor value: ${dataValue.value.value}`);
                res.status(200).send(`value: ${dataValue.value.value}`);
            }
        })
    }
    async temperatura(req, res) {
        if (!the_session) {
            console.log(`desconectado`)
            res.status(502).send(`desconectado`);
            return;
        }
        await the_session.read({ nodeId: "ns=2;s=MDB.PLC1.Temperatura", attributeId: AttributeIds.Value }, (err, dataValue) => {
            if (!err) {
                console.log(`Temperatura value: ${dataValue.value.value}`);
                res.status(200).send(`value: ${dataValue.value.value}`);
            }
        })
    }
    async fluxo(req, res) {
        if (!the_session) {
            console.log(`desconectado`)
            res.status(502).send(`desconectado`);
            return;
        }
        await the_session.read({ nodeId: "ns=2;s=MDB.PLC1.Fluxo", attributeId: AttributeIds.Value }, (err, dataValue) => {
            if (!err) {
                console.log(`Fluxo value: ${dataValue.value.value}`);
                res.status(200).json(`value: ${dataValue.value.value}`);
            }
        })
    }
}

module.exports = new OPCUA();