import mongoose from 'mongoose'

const StatusHistorySchema = new mongoose.Schema(
  {
    api: { type: String, enum: ['online', 'offline'], required: true },
    cpu: { type: Number, required: true },
    ram: { type: Number, required: true },
    disk: { type: Number, required: true },
    uptime: { type: Number, required: true }
  },
  { timestamps: true }
)

export default mongoose.model('StatusHistory', StatusHistorySchema)
