import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    checked: {type: String, required: true},
    name: {type: String, required: true}
});

export default mongoose.models.userModels || mongoose.model('todoModels', todoSchema);