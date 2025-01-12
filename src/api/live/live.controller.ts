import { Request, Response } from 'express'
import { getLiveStatus } from './live.crud'
import { LiveStatusSchema } from './live.schema'

export async function getCurrentLiveStatus(req: Request, res: Response): Promise<void> {
  try {
    const liveStatus = await getLiveStatus()
    
    // Validate response data
    const validatedStatus = LiveStatusSchema.parse(liveStatus)

    // Set cache headers
    res.set('Cache-Control', 'public, s-maxage=30')
    
    res.json(validatedStatus)  // Remove return

  } catch (error) {
    console.error('Failed to fetch live status:', error)
    res.status(500).json({ 
      error: 'Failed to fetch live status' 
    })
  }
}