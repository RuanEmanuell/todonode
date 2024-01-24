import { Router } from 'express';
import { listTodos, createTodo, deleteTodo, updateTodo } from "../services/todolist.js";

const router = Router();

// Rota para listar todos os todos
router.get('/list-todos', async (req, res) => {
    try {
        const todos = await listTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Rota para criar um novo todo
router.post('/', async (req, res) => {
    try {
        const todo = req.body;
        const createdTodo = await createTodo(todo);
        res.status(201).send(createdTodo);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Rota para deletar um todo pelo ID
router.delete('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        await deleteTodo(todoId); 
        res.status(200).send({ message: 'Todo deletado com sucesso' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Rota para atualizar um todo pelo ID
router.put('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const todoData = req.body;
        await updateTodo(todoId, todoData); 
        res.status(200).send({ message: 'Todo atualizado com sucesso' });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
