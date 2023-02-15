import { Component, Output, EventEmitter } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-movie-rating',
  templateUrl: './user-movie-rating.component.html',
  styleUrls: ['./user-movie-rating.component.scss'],
})
export class UserMovieRatingComponent {
  @Output() closeEvent = new EventEmitter<null>();
  close = faX;

  handleClose() {
    this.closeEvent.emit();
  }
}
