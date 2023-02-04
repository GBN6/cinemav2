import { Component, Input } from '@angular/core';
import { MoviesCard } from '../../movies.interface';

@Component({
  selector: 'app-movies-card-buttons',
  templateUrl: './movies-card-buttons.component.html',
  styleUrls: ['./movies-card-buttons.component.scss'],
})
export class MoviesCardButtonsComponent {
  @Input() movieCard!: MoviesCard;
  ismovieCardInWishList = false;
}
