import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading$$ = new BehaviorSubject(false);

  get isLoading$() {
    return this.isLoading$$.asObservable();
  }
  show() {
    this.isLoading$$.next(true);
  }

  hide() {
    this.isLoading$$.next(false);
  }
}
