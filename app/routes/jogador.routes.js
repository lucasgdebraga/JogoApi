const express = require('express');
const router = express.Router();
const jogadorController = require('../controllers/JogadorController.js');
const authMiddleware = require('../middlewares/isAutenticado.js');


router.get('/jogador', [authMiddleware.check], jogadores.findAll);

router.get('/jogador/:id', [authMiddleware.check], jogadores.findOne);

router.post('/jogador', [authMiddleware.check], jogadores.create);

router.put('/jogador/:id', [authMiddleware.check], jogadores.update);

router.delete('/jogador/:id', [authMiddleware.check], jogadores.delete);

module.exports = router;