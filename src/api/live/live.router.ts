import { createRouter } from 'next-connect'
import { getCurrentLiveStatus } from './live.controller'

const router = createRouter()

router.get('/api/live/status', getCurrentLiveStatus)

export default router