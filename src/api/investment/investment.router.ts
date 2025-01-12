import { createRouter } from 'next-connect'
import { initiatePayment, handleWebhook } from './investment.controller'

const router = createRouter()

router.post('/api/investment/purchase', initiatePayment)
router.post('/api/investment/webhook', handleWebhook)

export default router