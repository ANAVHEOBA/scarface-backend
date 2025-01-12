import mongoose from 'mongoose'
import type { Track, TrackPreview } from './tracks.model'

// Define Schema
const TrackSchema = new mongoose.Schema({
  title: String,
  previewUrl: String,
  duration: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Create Model
const TrackModel = mongoose.model('Track', TrackSchema)

export async function getTrackPreviews(): Promise<TrackPreview[]> {
  const tracks = await TrackModel
    .find({})
    .select('title previewUrl duration')
    .limit(3)
    .sort({ createdAt: -1 })
    .lean()

  return tracks
}