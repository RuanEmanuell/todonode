import mongoose from 'mongoose';

// URI de conexão com o MongoDB, adicione a sua
const uri = '';

// Função para estabelecer a conexão com o banco de dados
const databaseConnection = async () => {
    // Verifica se já existe uma instância global do Mongoose
    if (!global.mongoose) {
        // Desativa o modo estrito de consulta (strictQuery) para flexibilidade
        mongoose.set('strictQuery', false);

        // Conecta ao banco de dados usando a URI fornecida
        global.mongoose = await mongoose.connect(uri);
    }
}

// Exporta a função de conexão com o banco de dados
export default databaseConnection;
