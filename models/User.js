import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collect',
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
