import { Router } from 'express';
import { listTodos, createTodo, deleteTodo, updateTodo } from "../services/todolist.js";

const router = Router();

router.get('/', async (req, res) => {
    const todoList = await listTodos();
    res.send(todoList);
});


router.get('/list-todos', async (req, res) => {
    const todos = await listTodos();
    res.json(todos);
});

router.post('/', async (req, res) => {
    try{
    const todo = req.body;
    const createdTodo = await createTodo(todo);
    res.status(201).send(createdTodo);
    }catch(err){
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        await deleteTodo(todoId); 
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const todoData = req.body;
        await updateTodo(todoId, todoData); 
        res.status(200).send({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).send(error);
    }
});


export default router;