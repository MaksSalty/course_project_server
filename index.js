import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'
import collectRoute from './routes/collects.js'
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/collects', collectRoute)
app.use('/comments', commentRoute)

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('MongoDB OK'))
  .catch((err) => console.log('MongoDB error', err))

app.listen(process.env.PORT, () => console.log('Server OK'))
