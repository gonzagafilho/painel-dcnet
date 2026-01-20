import mongoose from "mongoose"

const AtendimentoSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["aberto", "finalizado"],
      default: "aberto",
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model("Atendimento", AtendimentoSchema)
