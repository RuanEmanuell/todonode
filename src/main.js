import express from 'express';
import bodyParser from 'body-parser';
import todoController from './controllers/todocontroller.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static('src/public'));
app.use('/user', todoController);

app.listen(port, () => {
    
});