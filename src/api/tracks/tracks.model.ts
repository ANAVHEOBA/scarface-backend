import mongoose from 'mongoose'

export interface Track {
  id: string;
  title: string;
  previewUrl: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrackPreview {
  id: string;
  title: string;
  previewUrl: string;
  duration: number;
}

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  previewUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const TrackModel = mongoose.model('Track', TrackSchema)