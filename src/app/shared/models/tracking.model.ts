export interface Tracking {
  id: number;
  start: string;
  end: string;
  bookId: number;
  title?: string;
  author: string;
}

export interface StoredTracking {
  lastTracking: Tracking;
  trackings: Tracking[];
}