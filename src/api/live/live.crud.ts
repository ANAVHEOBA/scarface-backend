import { LiveStatus } from './live.model'
import { LiveStreamModel } from './live.model'

export async function getLiveStatus(): Promise<LiveStatus> {
  const currentStream = await LiveStreamModel.findOne({
    isLive: true,
    endedAt: null
  })
  .sort({ startedAt: -1 })
  .select('isLive streamUrl platform')
  .lean()

  return currentStream || {
    isLive: false,
    streamUrl: '',
    platform: 'youtube' // default platform
  }
}