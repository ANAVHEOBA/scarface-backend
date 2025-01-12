import { IncomingMessage, ServerResponse } from 'http'
import { getTrackPreviews } from './tracks.crud'
import { TrackPreviewSchema } from './tracks.schema'

export async function getPreviewTracks(req: IncomingMessage, res: ServerResponse) {
  try {
    const tracks = await getTrackPreviews()
    
    // Validate response data
    const validatedTracks = tracks.map(track => 
      TrackPreviewSchema.parse(track)
    )

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ tracks: validatedTracks }))

  } catch (error) {
    console.error('Failed to fetch preview tracks:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Failed to fetch preview tracks' }))
  }
}