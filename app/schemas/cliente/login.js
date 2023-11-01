module.exports = {
    type: 'object',
    properties: {
        email: {tyoe: 'string'},
        senha: {type: 'string'},
    },
    required: ['email', 'senha'],
    additionalProperties: false,
};