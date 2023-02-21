import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorhandlerService {
  private error$$ = new BehaviorSubject(false);

  get error$() {
    return this.error$$.asObservable();
  }
  errorShows() {
    this.error$$.next(true);
  }
  errorHide() {
    this.error$$.next(false);
  }
}
