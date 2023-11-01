const jwt = require('jsonwebtoken');
const config = require('../../config.js');


exports.check = (request, response, next) => {
    const cabecalhoAuth = request.headers['authorization'];

    if (!cabecalhoAuth) {
        return response.status(401).json({
            message:
                'Sem autorizacao ou nao possui authorization nos headers da requisicao.',
        });
    }

    if (!cabecalhoAuth.startsWith('Bearer')) {
        return res.status(401).json({
            message: 'mecanismo de autenticacao invalido, congirue Bearer Token.',
        });
    }
    const token = cabecalhoAuth.split(' ')[1];

    if (!token) {
        return response.status(401).json({
            message: 'Token nao fornecido.',
        });
    }

    jwt.verify(token, config.jwt.secret, (erro, clientedata) => {
        if (erro) {
            return response.status(403).json({
                message: 'token esta invalido, realize o login novamente.',
            });
        }
        // request.client = clientedata; //caso queira salvar os dados do cliente para proximas etapas

        next();
    });
};