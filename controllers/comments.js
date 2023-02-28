import Comment from '../models/Comment.js'
import Collect from '../models/Collect.js'

export const createComment = async (req, res) => {
  try {
    const { collectId, comment } = req.body
    if (!comment) return res.json({ message: 'Comment is empty' })
    const newComment = new Comment({ comment })
    await newComment.save()
    try {
      await Collect.findByIdAndUpdate(collectId, {
        $push: { comments: newComment._id },
      })
    } catch (error) {
      console.log(error)
    }
    res.json(newComment)
  } catch (error) {
    res.json({ message: 'Error creating comment' })
  }
}
