import databaseConnection from "../utils/database.js";
import todoModels from "../models/todomodels.js";

// Função para listar todos os todos
export const listTodos = async () => {
    // Estabelece a conexão com o banco de dados
    await databaseConnection();
    
    // Busca todos os registros na coleção de todos
    const todos = await todoModels.find();
    
    // Retorna a lista de todos
    return todos;
}

// Função para criar um novo todo
export const createTodo = async (todo) => {
    // Estabelece a conexão com o banco de dados
    await databaseConnection();
    
    // Cria um novo registro na coleção de todos
    const createdTodo = await todoModels.create(todo);
    
    // Retorna o todo recém-criado
    return createdTodo;
}

// Função para deletar um todo pelo ID
export const deleteTodo = async (todoId) => {
    // Estabelece a conexão com o banco de dados
    await databaseConnection();
    
    // Deleta o todo pelo ID
    return await todoModels.findByIdAndDelete(todoId);
}

// Função para atualizar um todo pelo ID
export const updateTodo = async (todoId, todoData) => {
    // Estabelece a conexão com o banco de dados
    await databaseConnection();
    
    // Atualiza o todo pelo ID com os novos dados
    return await todoModels.findByIdAndUpdate(todoId, todoData, { new: true });
}
