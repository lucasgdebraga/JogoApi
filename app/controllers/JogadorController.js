const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/jogador/novoJogador.js');
const schemaUpdate = require('../schemas/jogador/atualizaJogador.js');
const validacaoUpdate = ajv.compile(schemaUpdate);
const validacao = ajv.compile(schema);
const models = require('../models');
const Jogador = models.jogador;
const Equipamento = models.equipamento;

exports.findAll = (request, response) => {
    Jogador.findAll({ include: EquipamentoS })
        .then((data) => {
            return response.status(200).json(data);
        })
        .catch((erro) => {
            return response.status(500).json({
                message: 'erro no servidor' + erro.message,
            });
        });

};

exports.findOne = (request, response) => {
    let id = request.params.id;
    Jogador.findByPk(id)
        .then((data) => {
            if (data) {
                return response.status(200).json(data);
            } else {
                return response.status(404).json({
                    message: 'jogador nao encontrado',
                });
            }
        })
        .catch((erro) => {
            response.status(500).json({
                message: erro.message,
            });
        });
};

exports.store = (request, response) => {
    let validacoes = validacao(request.body);


    if (!request.body.ataque || !request.body.ataque || !request.body.defesa || !request.body.nome) {
        return response.status(400).json({
            message: 'campo obrigatorio nao informado'
        });
    }
    if (request.body.ataque > 100 || request.body.ataque < 0) {
        return response.status(400).json({
            message: 'valores fora do limite para ataque',
        });
    }
    Jogador.create(request.body).then((data) => {
        return response.status(201).json(data);
    })
        .catch((erro) => {
            return response.status(500).json({
                message: 'erro no servidor' + erro.message,
            });
        });
};

exports.update = (request, response) => {
    let id = request.params.id;
    let validacoes = validacaoUpdate(request.body);
    if (!validacoes) {
        return response.status(400).json({
            message: validacaoUpdate.errors[0].message,
        });
    }
    Jogador.findByPk(id)
        .then((data) => {
            if (data) {
                Jogador.update(request.body, { where: { id: id } }).then((result) => {
                    if (result) {
                        Jogador.findByPk(id).then((resultSearch) => {
                            return response.status(200).json(resultSearch);
                        });
                    }
                });
            } else {
                return response.status(404).json({
                    message: 'jogador nao encontrado',
                });
            }
        })
        .catch((erro) => {
            response.status(500).json({
                message: 'erro no servidor' + erro.message,
            });
        });
};


exports.delete = (request, response) => {
    let id = request.params.id;
    Jogador.findByPk(id)
        .then((data) => {
            if (data) {
                data.destroy();
                return response.status(200).json({
                    message: 'jogador excluido com sucesso',
                });
            } else {
                return response.status(404).json({
                    message: 'jogador nao encontrado',
                });
            }
        })
        .catch((erro) => {
            return response.status(500).json({
                message: 'erro no servidor' + erro.message,
            });
        });

};
