import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type Pegi = 'PG-3' | 'PG-7' | 'PG-12' | 'PG-16' | 'PG-18';

export type Genre =
  | 'Dramat'
  | 'Thriller'
  | 'Kryminał'
  | 'Komedia'
  | 'Akcja'
  | 'Romans'
  | 'Sci-Fi'
  | 'Przygodowy';

export interface Movie {
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

export interface Screen {
  name: string;
  rows: number;
  colu: number;
  specialSeats: string[];
}

export interface Show {
  id: number;
  hour: string;
  screen: string;
  reservedSeats: any[];
  priceList: PriceList[];
  movieId: number;
  dateId: number;
}

export interface PriceList {
  type: string;
  price: number;
}

export interface AddMovieForm {
  img: FormControl<string>;
  title: FormControl<string>;
  genre: FormControl<Genre[]>;
  length: FormControl<number | null>;
  ageRest: FormControl<string>;
  description: FormControl<string>;
  longDescription: FormControl<string>;
  score: FormControl<string>;
  premier: FormControl<boolean>;
}

export interface AddShowForm {
  movieId: FormControl<MovieControl>;
  hour: FormControl<string>;
  day: FormControl<string>;
  screen: FormControl<string>;
  priceList: FormArray<FormGroup<AddPriceListItem>>;
}

export interface MovieControl {
  movieId: number;
  movieLength: number;
}

export interface AddPriceListItem {
  type: FormControl<string>;
  price: FormControl<number | null>;
}

export interface PegiRating {
  id: number;
  name: Pegi;
}

export interface FetchedGenre {
  id: number;
  name: Genre;
}

export interface FetchedMovie extends Movie {
  id: number;
}

export interface FetchedScreen extends Screen {
  id: number;
}

export interface TicketType {
  type: 'Ulgowy' | 'Senior' | 'Normalny';
}
