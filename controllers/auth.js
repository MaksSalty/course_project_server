import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
  try {
    const { username, password } = req.body
    const isUsed = await UserModel.findOne({ username })
    if (isUsed) {
      return res.json({ message: 'Name already in use' })
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = new UserModel({ username, password: hash })
    const token = jwt.sign({ id: newUser._id }, process.env.JWT)
    await newUser.save()
    res.json({ newUser, token, message: 'You are registered' })
  } catch (error) {
    res.json({ message: 'Registration error' })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username })
    if (!user) {
      return res.json({ message: 'User is not found' })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.json({ message: 'Wrong password' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT)
    res.json({ token, user, message: 'You are authorized' })
  } catch (error) {
    res.json({ message: 'Authorization error' })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    if (!user) {
      return res.json({ message: 'User is not found' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT)
    res.json({ user, token })
  } catch (error) {
    res.json({ message: 'No access' })
  }
}
