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