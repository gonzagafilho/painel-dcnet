import mongoose from 'mongoose';

const ChatStateSchema = new mongoose.Schema({
  telefone: { type: String, required: true, unique: true },
  estado: { type: String, default: 'menu' }, 
  setor: { type: String, default: null }, // vendas | suporte | financeiro
  ultimaMensagem: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ChatState', ChatStateSchema);
