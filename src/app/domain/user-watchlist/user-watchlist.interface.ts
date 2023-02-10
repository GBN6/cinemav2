import { MoviesCard } from '../movies/movies.interface';

export interface UserWatchList {
  id: number;
  movies: MoviesCard;
  userId: number;
}
