import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(
    public dialogRef: MatDialogRef<UserMovieRatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  onClick(): void {
    this.dialogRef.close(this.rate);
  }
}
