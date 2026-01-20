import mongoose from "mongoose"

const AtendimentoSchema = new mongoose.Schema(
  {
    cliente: {
      type: String,
      required: true
    },
    canal: {
      type: String,
      default: "manual"
    },
    status: {
      type: String,
      enum: ["aberto", "finalizado"],
      default: "aberto"
    }
  },
  { timestamps: true }
)

export default mongoose.model("Atendimento", AtendimentoSchema)
