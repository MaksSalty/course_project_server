import mongoose from 'mongoose'

const CollectSchema = new mongoose.Schema(
  {
    username: { type: String },
    title: { type: String, required: true },
    text: { type: String, required: true },
    imgUrl: { type: String, default: '' },
    like: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
)
export default mongoose.model('Collect', CollectSchema)
