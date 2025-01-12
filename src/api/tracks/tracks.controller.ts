import { Request, Response } from 'express'
import { getTrackPreviews } from './tracks.crud'
import { TrackPreviewSchema } from './tracks.schema'

export async function getPreviewTracks(req: Request, res: Response): Promise<void> {
  try {
    const tracks = await getTrackPreviews()
    
    // Validate response data
    const validatedTracks = tracks.map(track => 
      TrackPreviewSchema.parse(track)
    )

    res.json({ tracks: validatedTracks })  // Remove return

  } catch (error) {
    console.error('Failed to fetch preview tracks:', error)
    res.status(500).json({ 
      error: 'Failed to fetch preview tracks' 
    })
  }
}