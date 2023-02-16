import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectedMovieStatfullService } from 'src/app/shared/services/selected-movie.state.service';

@Component({
  selector: 'app-movies-dates',
  templateUrl: 'movies-dates.component.html',
  styleUrls: ['./movies-dates.component.scss'],
})
export class MoviesDatesComponent {
  private selectedStateService = inject(SelectedMovieStatfullService);
  private subscription = new Subscription();
  private router = inject(Router);

  week: string[] = [];
  clickedIndex = 0;
  currentIndex = 0;

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
        this.clickedIndex = index;
        this.router.navigate([index]);
      }
    });

    const sub = this.selectedStateService.stateSelectedDate$.subscribe(
      (result) => {
        this.week.forEach((date, index) => {
          if (!result) return;
          if (index === result.id) {
            this.clickedIndex = index;
            this.router.navigate([index]);
          }
        });
      }
    );
    this.subscription.add(sub);
  }

  selectDate(index: number) {
    this.clickedIndex = index;
    this.selectedStateService.addNewSelectedDate({
      id: this.clickedIndex,
      date: this.week[this.clickedIndex],
    });
    this.router.navigate([index]);
  }

  ngOnInit() {
    this.getDates();
    this.setTodayDate();
    console.log(this.clickedIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
