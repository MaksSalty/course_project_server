import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('MongoDB OK'))
  .catch((err) => console.log('MongoDB error', err))

app.listen(process.env.PORT, () => console.log('Server OK'))
