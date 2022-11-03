const connection = require('../model/connection');
const jwt = require("jsonwebtoken");
const segredo = "segredo";
class Token {
    creatTokenJWT(usuario) {
        const payload = { Matricula: usuario.Matricula, userName: usuario.userName };
        console.log('payload', payload);
        const token = jwt.sign(payload, segredo, { expiresIn: "1h" });
        console.log('token', token);
        return token;
    }   

    async checarToken(req) {
        try {
            const token = req.query.token || req.body.token;
            const path = req.route.path;
            console.log("token checar token:", token);
            if (!token) {
                console.log("Não autorizado");
                return { err: true, msg: "Não autorizado" };
            }
            const userJwt = jwt.verify(token, segredo);
            console.log('userJwt', userJwt);

            let userDB = [];
            const sql = `SELECT * FROM user WHERE user.Matricula = "${userJwt.Matricula}"`
            await connection.query(sql, (err, result, fields) => {
                if (err) {
                    console.log('err query', err);
                    return { err: true, msg: err };
                }
                try {
                    console.log('result', result);
                    userDB = result;
                    console.log('userDB', userDB);
                    if (!userDB.length) {
                        console.log("checarToken: Usuario não encontrado");
                        return { err: true, msg: "Usuario não encontrado" };
                    }
                    const administrador = path.search("admin") != -1;
                    console.log("administrador", administrador);
                    if (administrador && !userDB[0].Adm) {
                        console.log("Usuario não é administrador");
                        return { err: true, msg: "Usuario não é administrador" };
                    }
                    console.log("Válido");
                    return { err: false };
                } catch (error) {
                    console.log("Erro query:",error );
                    return { err: true, msg: error};
                }
            })

        } catch (error) {
            console.log("Inválido");
            console.log("error checarToken: ", error);
            return { err: true, msg: error };
        }
    }
}

module.exports = new Token();