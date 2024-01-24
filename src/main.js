import express from 'express';
import bodyParser from 'body-parser';
import todoController from './controllers/todocontroller.js';

// Cria uma instância do aplicativo Express
const app = express();

// Porta em que o servidor irá escutar
const port = 3000;

// Utiliza o middleware para analisar o corpo das solicitações em formato JSON
app.use(bodyParser.json());

// Define o diretório 'src/public' como um diretório estático acessível publicamente
app.use(express.static('src/public'));

// Define o controlador de todos os usuários para as rotas começando com '/user'
app.use('/user', todoController);

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
