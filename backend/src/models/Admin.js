import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    ativo: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    collection: 'admins' // 🔴 ISSO É O QUE FALTAVA
  }
)

export default mongoose.model('Admin', AdminSchema)

