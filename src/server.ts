import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { connectDB } from './lib/db'
import investmentRouter from './api/investment/investment.router'
import tracksRouter from './api/tracks/tracks.router'
import liveRouter from './api/live/live.router'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/investment', investmentRouter)
app.use('/api/tracks', tracksRouter)
app.use('/api/live', liveRouter)

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something broke!' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app