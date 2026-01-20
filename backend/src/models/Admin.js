import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    senha: {
      type: String,
      required: true
    },
    nome: {
      type: String,
      default: 'Administrador DC NET'
    },
    ativo: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Admin', AdminSchema)
