import { MoviesCard, Show } from 'src/app/domain/movies/movies.interface';

export interface MovieState {
  selectedMovie: MoviesCard;
  selectedShow: Show;
  selectedDate: SelectedDate;
}

export interface SelectedDate {
  id: number;
  date: string;
}

export interface TicketState {
  id: string;
  showId: number;
  movieTitle: string;
  date: string;
  hour: string;
  screen: string;
  seat: Seat;
}

export interface Seat {
  position: string;
  type: string;
  price: number;
  special: boolean;
}

export interface FullPrice {
  price: number;
  dicsount: Discount;
}

export interface Discount {
  id: number;
  code: string;
  discount: number;
}
