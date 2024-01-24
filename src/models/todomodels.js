import mongoose from 'mongoose';

// Definição do esquema para o modelo Todo
const todoSchema = new mongoose.Schema({
    checked: { type: String, required: true },
    name: { type: String, required: true }
});

// Exportação do modelo Todo
export default mongoose.models.todoModels || mongoose.model('todoModels', todoSchema);
