import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-user-movie-rating',
  templateUrl: './user-movie-rating.component.html',
  styleUrls: ['./user-movie-rating.component.scss'],
  imports: [FontAwesomeModule, CommonModule],
})
export class UserMovieRatingComponent {
  @Output() closeEvent = new EventEmitter<null>();
  close = faX;

  handleClose() {
    this.closeEvent.emit();
  }
}
