import { NextResponse } from 'next/server'
import { getLiveStatus } from './live.crud'
import { LiveStatusSchema } from './live.schema'

export async function getCurrentLiveStatus() {
  try {
    const liveStatus = await getLiveStatus()
    
    // Validate response data
    const validatedStatus = LiveStatusSchema.parse(liveStatus)

    return NextResponse.json(validatedStatus, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=30', // Cache for 30 seconds
      }
    })

  } catch (error) {
    console.error('Failed to fetch live status:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch live status' 
    }, { status: 500 })
  }
}