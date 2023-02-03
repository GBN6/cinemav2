import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MoviesListService } from './movies-list.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent {
  private moviesListService = inject(MoviesListService);

  week: string[] = [];
  clickedIndex = 0;
  currentIndex = 0;
  movies$ = this.moviesListService.getMovies(this.clickedIndex);

  private getDates() {
    let curr = new Date();
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first))
        .toLocaleDateString('en-GB')
        .slice(0, 10);
      this.week.push(day);
    }
    console.log(this.week);
  }

  private setDefaultDate() {
    let today = new Date().toLocaleDateString('en-GB').slice(0, 10);
    this.week.forEach((date, index) => {
      if (date === today) {
        this.clickedIndex = index;
        this.currentIndex = index;
      }
    });
    console.log(today);
  }

  ngOnInit() {
    this.getDates();
    this.setDefaultDate();
    // this.movieService.selectedDate = this.week[this.clickedIndex];
    console.log(this.week[0] > this.week[this.clickedIndex]);
  }
}
