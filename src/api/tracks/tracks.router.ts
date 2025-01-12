import express, { Router } from 'express'
import { getPreviewTracks } from './tracks.controller'

const router: Router = express.Router()

router.get('/preview', async (req, res, next) => {
  try {
    await getPreviewTracks(req, res)
  } catch (error) {
    next(error)
  }
})

export default router