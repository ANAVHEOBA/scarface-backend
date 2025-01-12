import { z } from 'zod'

export const TrackSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  previewUrl: z.string().url(),
  duration: z.number().min(1),
})

export const TrackPreviewSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  previewUrl: z.string().url(),
  duration: z.number().max(30), // Preview limited to 30 seconds
})