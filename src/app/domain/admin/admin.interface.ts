import { FormControl, FormGroup } from '@angular/forms';

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

export interface PegiRating {
  id: number;
  name: Pegi;
}

export interface FetchedGenre {
  id: number;
  name: Genre;
}
