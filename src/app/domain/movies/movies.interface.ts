export interface MoviesCard {
  id: number;
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

export interface Shows {
  id: number;
  hour: string;
  screen: string;
  reservedSeats: string[];
  priceList: PriceList[];
  filmId: number;
}

export interface PriceList {
  type: string;
  price: number;
}
