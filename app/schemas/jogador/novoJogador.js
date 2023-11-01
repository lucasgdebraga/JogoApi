module.exports = {
    type: 'object',
    properties: {
    nome: { type: 'string', minLength: 3 },
    ataque: { type: 'integer', minimum: 1, maximum: 100 },
    defesa: { type: 'integer', maximum: 100 },
    pontos_vida: { type: 'integer', minimum: 100, maximum: 100 },
    },
    required: ['nome', 'ataque', 'defesa'],
    additionalProperties: false,
   };
   