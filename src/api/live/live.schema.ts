import { z } from 'zod'

export const LiveStreamSchema = z.object({
  isLive: z.boolean(),
  streamUrl: z.string().url(),
  platform: z.enum(['youtube', 'twitch', 'instagram']),
  startedAt: z.date().optional(),
  endedAt: z.date().optional(),
})

export const LiveStatusSchema = z.object({
  isLive: z.boolean(),
  streamUrl: z.string(),
  platform: z.enum(['youtube', 'twitch', 'instagram']),
})