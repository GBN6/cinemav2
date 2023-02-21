import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';
import { FetchedMovie, Film, Show } from '../admin.interface';
import { AdminPanelService } from '../admin.service';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.scss'],
})
export class AddShowComponent {
  private adminPanelService = inject(AdminPanelService);
  private snackBar = inject(MatSnackBar);

  movies$ = this.adminPanelService.getAllMovies();
  screens$ = this.adminPanelService.getAllScreens();
  films$ = this.adminPanelService.getAllFilms();

  newShowData$ = combineLatest([this.movies$, this.screens$, this.films$]);

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000,
    });
  }

  addMovieToDate(
    event: { movie: FetchedMovie; dateId: number },
    films: Film[]
  ) {
    const isMovieInFilms = films.filter((film) => {
      return film.movieId === event.movie.id && film.dateId === event.dateId;
    });

    if (isMovieInFilms.length === 0) {
      console.log(event.movie);
      const movieData = event.movie;
      this.adminPanelService
        .addNewMovieToDate({
          ...movieData,
          id: Math.random() + event.movie.id,
          dateId: event.dateId,
          movieId: movieData.id,
        })
        .subscribe(console.log);
    }
  }

  addShow(show: Show) {
    this.adminPanelService
      .addNewShow(show)
      .subscribe({ next: () => this.openSnackBar('Dodano nowy seans', 'X') });
  }

  ngOnInit() {
    // this.adminPanelService
    //   .isDateAvaible('18:30', 100, 1, 'A')
    //   .subscribe(console.log);
  }
}
