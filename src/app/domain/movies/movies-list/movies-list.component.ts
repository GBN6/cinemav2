import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SelectedMovieStatfullService } from 'src/app/shared/services/selectedMovie.statefull.service';
import { MoviesCard } from '../movies.interface';
import { MoviesListService } from './movies-list.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent {
  private moviesListService = inject(MoviesListService);
  private selectedStateService = inject(SelectedMovieStatfullService);

  private subscription = new Subscription();

  week: string[] = [];
  clickedIndex = 0;
  currentIndex = 0;
  movies$: Observable<MoviesCard[]> | null = null;

  private getDates() {
    let curr = new Date();
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first))
        .toLocaleDateString('en-GB')
        .slice(0, 10);
      this.week.push(day);
    }
  }

  private setTodayDate() {
    let today = new Date().toLocaleDateString('en-GB').slice(0, 10);
    this.week.forEach((date, index) => {
      if (date === today) {
        this.currentIndex = index;
      }
    });

    const sub = this.selectedStateService.stateSelectedDate$.subscribe(
      (result) => {
        this.week.forEach((date, index) => {
          if (index === result.id) {
            this.clickedIndex = index;
          }
        });
      }
    );
    this.subscription.add(sub);
  }

  selectDate(index: number) {
    this.clickedIndex = index;
    this.movies$ = this.moviesListService.getMovies(this.clickedIndex);
    this.selectedStateService.addNewSelectedDate({
      id: this.clickedIndex,
      date: this.week[this.clickedIndex],
    });
  }

  ngOnInit() {
    this.getDates();
    this.setTodayDate();
    this.movies$ = this.moviesListService.getMovies(this.clickedIndex);
    this.selectedStateService.addNewSelectedDate({
      id: this.clickedIndex,
      date: this.week[this.clickedIndex],
    });
  }

  ngOndestroy() {
    this.subscription.unsubscribe();
  }
}
