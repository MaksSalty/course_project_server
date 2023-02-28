import CollectModel from '../models/Collect.js'
import UserModel from '../models/User.js'
import Comment from '../models/Comment.js'

export const createCollect = async (req, res) => {
  try {
    const { title, text, imgUrl } = req.body
    const user = await UserModel.findById(req.userId)
    const newCollection = new CollectModel({
      username: user.username,
      title,
      text,
      imgUrl: '',
      author: req.userId,
    })
    await newCollection.save()
    await UserModel.findByIdAndUpdate(req.userId, {
      $push: { collects: newCollection },
    })
    res.json(newCollection)
  } catch (error) {
    res.json({ message: 'Error creating collection', error })
  }
}

export const getAll = async (req, res) => {
  try {
    const collects = await CollectModel.find().sort('-createdAt')
    const popularCollects = await CollectModel.find().limit(5).sort('-like')
    if (!collects) {
      return res.json({ message: 'No collections yet' })
    }
    res.json({ collects, popularCollects })
  } catch (error) {
    res.json({ message: 'Error loading collections' })
  }
}

export const getById = async (req, res) => {
  try {
    const collect = await CollectModel.findByIdAndUpdate(req.params.id, {
      $inc: { like: 1 },
    })
    res.json(collect)
  } catch (error) {
    res.json({ message: 'Error loading collection' })
  }
}

export const getMyCollects = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    const list = await Promise.all(
      user.collects.map((collect) => {
        return CollectModel.findById(collect._id)
      })
    )
    res.json(list)
  } catch (error) {
    res.json({ message: 'Error loading collection' })
  }
}

export const removeCollect = async (req, res) => {
  try {
    const collect = await CollectModel.findByIdAndDelete(req.params.id)
    if (!collect) return res.json({ message: 'This collection does not exist' })
    await UserModel.findByIdAndUpdate(req.userId, {
      $pull: { collects: req.params.id },
    })
    res.json({ message: 'Collection deleted' })
  } catch (error) {
    res.json({ message: 'Error deleting collection' })
  }
}

export const updateCollect = async (req, res) => {
  try {
    const { title, text, id } = req.body
    const collect = await CollectModel.findById(id)
    collect.title = title
    collect.text = text
    await collect.save()
    res.json(collect)
  } catch (error) {
    res.json({ message: 'Collection editing error' })
  }
}

export const getCollectComments = async (req, res) => {
  try {
    const collect = await CollectModel.findById(req.params.id)
    const list = await Promise.all(
      collect.comments.map((comment) => {
        return Comment.findById(comment)
      })
    )
    res.json(list)
  } catch (error) {
    res.json({ message: 'Error creating comment' })
  }
}
