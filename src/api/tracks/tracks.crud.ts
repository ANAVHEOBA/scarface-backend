import { TrackModel } from './tracks.model'
import type { TrackPreview } from './tracks.model'

export async function getTrackPreviews(): Promise<TrackPreview[]> {
  const tracks = await TrackModel
    .find({})
    .select('_id title previewUrl duration')
    .limit(3)
    .sort({ createdAt: -1 })
    .lean()

  // Transform MongoDB documents to match TrackPreview interface
  return tracks.map(track => ({
    id: track._id.toString(),
    title: track.title,
    previewUrl: track.previewUrl,
    duration: track.duration
  }))
}