export interface MoviesCard {
  id: number;
  movieId: number;
  img: string;
  title: string;
  genre: string;
  length: string;
  ageRest: string;
  description: string;
  longDescription: string;
  score: string;
  premier: boolean;
}

export interface Show {
  id: number;
  hour: string;
  screen: string;
  reservedSeats: string[];
  priceList: PriceList[];
  movieId: number;
}

export interface PriceList {
  type: string;
  price: number;
}

export interface RatingState {
  rating: number;
  hasUserRated: boolean;
  movieId: number | null;
  userId: number | null;
}

export interface Rate {
  rate: number;
  userId: number;
  movieId: number;
}
