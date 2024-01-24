import databaseConnection from "../utils/database.js";
import todoModels from "../models/todomodels.js";

export const listTodos = async () => {
    await databaseConnection();
    const todos = await todoModels.find();
    return todos;
}

export const createTodo = async (todo) => {
    await databaseConnection();
    const createdtodo = await todoModels.create(todo);
    return createdtodo;
}

export const deleteTodo = async (todoId) => {
    await databaseConnection();
    return await todoModels.findByIdAndDelete(todoId);
}

export const updateTodo = async (todoId, todoData) => {
    await databaseConnection();
    return await todoModels.findByIdAndUpdate(todoId, todoData, { new: true });
}