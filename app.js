require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const app = express();
const models = require('./app/models/');
app.use(express.json());
//cors:
app.use(
    cors({
        origin: '*',
    })
);


// try {
//     models.sequelize.authenticate();
//     console.log('Conexao realizada com sucesso ao BD.');
//    } catch (error) {
//     console.log('Nao foi possivel se conectar com o BD:', error);
//    }
models.sequelize
    .sync() //{ force: true }
    .then(() => {
        console.log('sincronizacao com bd...');
    })
    .catch((error) => {
        console.log('falha ao sincronizar: ' + error.message);
    });


//Rotas
app.get('/', (request, response) => {
    return response.status(200).json({
        version: '1.0.0',
        description: 'API data for players game'
    });
});
const jogadorRotas = require('./app/routes/jogador.routes.js');
const clienteRotas = require('./app/routes/cliente.routes.js');
app.use(jogadorRotas);
app.use(clienteRotas);

app.listen(config.port, () => {
    console.log('servidor on-line');
});
