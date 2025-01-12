import { createRouter } from 'next-connect'
import { getPreviewTracks } from './tracks.controller'

const router = createRouter()

router.get('/api/tracks/preview', getPreviewTracks)

export default router