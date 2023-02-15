import { Component } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-movie-rating',
  templateUrl: './user-movie-rating.component.html',
  styleUrls: ['./user-movie-rating.component.scss'],
})
export class UserMovieRatingComponent {
  star = faStar;
  rateScale = 10;
  rate = 0;

  handleChangeRate(rate: number) {
    this.rate = rate;
  }
}
