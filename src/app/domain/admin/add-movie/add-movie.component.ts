import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../admin.interface';
import { AdminPanelService } from '../admin.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent {
  private adminPanelService = inject(AdminPanelService);
  private snackBar = inject(MatSnackBar);

  movieGenres$ = this.adminPanelService.getAllGenres();
  moviePegi$ = this.adminPanelService.getAllPegiRatings();

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000,
    });
  }

  addMovie(movie: Movie) {
    this.adminPanelService
      .addNewMovie(movie)
      .subscribe({ next: () => this.openSnackBar('Dodano nowy film', 'X') });
  }
}
