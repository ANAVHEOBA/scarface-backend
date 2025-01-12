import mongoose from 'mongoose'

export interface LiveStream {
  id: string;
  isLive: boolean;
  streamUrl: string;
  platform: 'youtube' | 'twitch' | 'instagram';
  startedAt?: Date;
  endedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LiveStatus {
  isLive: boolean;
  streamUrl: string;
  platform: string;
}

// MongoDB Schema
const LiveStreamSchema = new mongoose.Schema({
  isLive: { type: Boolean, required: true },
  streamUrl: { type: String, required: true },
  platform: { 
    type: String, 
    enum: ['youtube', 'twitch', 'instagram'],
    required: true 
  },
  startedAt: Date,
  endedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const LiveStreamModel = mongoose.model('LiveStream', LiveStreamSchema)