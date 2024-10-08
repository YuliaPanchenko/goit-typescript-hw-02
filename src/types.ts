export interface UnsplashImage {
  id: string;
  urls: {
    full: string;
    thumb: string;
    regular?: string;
    small: string;
  };
  alt_description: string;
}

export interface UnsplashResponse {
  results: UnsplashImage[];
  total_pages: number;
}
