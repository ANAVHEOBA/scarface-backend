import express, { Router } from 'express'
import { getCurrentLiveStatus } from './live.controller'

const router: Router = express.Router()

router.get('/status', async (req, res, next) => {
  try {
    await getCurrentLiveStatus(req, res)
  } catch (error) {
    next(error)
  }
})

export default router