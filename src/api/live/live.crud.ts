import { prisma } from '@/lib/prisma'
import type { LiveStatus } from './live.model'

export async function getLiveStatus(): Promise<LiveStatus> {
  const currentStream = await prisma.liveStream.findFirst({
    where: {
      isLive: true,
      endedAt: null,
    },
    select: {
      isLive: true,
      streamUrl: true,
      platform: true,
    },
    orderBy: {
      startedAt: 'desc',
    },
  })

  return currentStream || {
    isLive: false,
    streamUrl: '',
    platform: 'youtube' // default platform
  }
}