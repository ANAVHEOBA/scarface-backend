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