import express, { Router } from 'express'
import { initiatePayment, handleWebhook } from './investment.controller'

const router: Router = express.Router()

// Remove type casting and use async middleware functions
router.post('/purchase', async (req, res, next) => {
  try {
    await initiatePayment(req, res)
  } catch (error) {
    next(error)
  }
})

router.post('/webhook', async (req, res, next) => {
  try {
    await handleWebhook(req, res)
  } catch (error) {
    next(error)
  }
})

export default router