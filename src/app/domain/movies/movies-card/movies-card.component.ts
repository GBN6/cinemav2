import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesCard } from '../movies.interface';

@Component({
  selector: 'app-movies-card[movieCard]',
  templateUrl: './movies-card.component.html',
  styleUrls: ['./movies-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesCardComponent {
  @Input() movieCard!: MoviesCard;

  showLongDescription = false;

  showDescription() {
    this.showLongDescription = !this.showLongDescription;
  }
}
