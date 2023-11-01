const crypto = require('crypto');
const { jwt } = require('../../config');
const { config } = require('process');
const jwt = require('jsonwebtoken');

exports.hashSenha = (password) => {
    const hash = crypto.createHash('sha256'); //instancia de Hash
    hash.update(password); //atualiza o conteudo dele com a senha para processar
    return hash.digest('hex'); //valor do hash em hexadecimal
};
exports.gerarToken = (nome, id) => {
    return jwt.sig({ nome, id }, config.jwt.secret, {
        expiresIn: config.jwt.expiration,
    });
};