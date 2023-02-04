import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Show } from '../../domain/movies/movies.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedShowStatfullService {
  private selectedShow$$ = new BehaviorSubject<Show | null>(null);

  get selectedShow$() {
    return this.selectedShow$$.asObservable();
  }

  addNewSelectedShow(show: Show) {
    this.selectedShow$$.next(show);
  }

  getScreenFromCurrentShow() {
    return this.selectedShow$$.value;
  }
}
