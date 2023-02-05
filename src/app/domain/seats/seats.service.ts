import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, of, tap } from 'rxjs';
import { Screen, ScreenGrid } from './seats.interface';

@Injectable()
export class SeatsService {
  private http = inject(HttpClient);
  private screenGrid$$ = new BehaviorSubject<ScreenGrid>({} as ScreenGrid);

  get screenGrid$() {
    return this.screenGrid$$.asObservable();
  }

  private getScreen(name?: string) {
    return this.http.get<Screen[]>(`http://localhost:3000/screen?q=${name}`);
  }

  private getRowsArray(n: number): string[] {
    return [...Array(n).keys()].map((i) => String.fromCharCode(i + 65));
  }

  private getColumnsArray(n: number): number[] {
    return [...Array(n).keys()].map((i) => i + 1);
  }

  getScreenRowsAndCols(screenName: string) {
    this.getScreen(screenName)
      .pipe(
        tap((item) => item),
        mergeMap((item) => item)
      )
      .subscribe((item) => {
        this.screenGrid$$.next({
          rows: this.getRowsArray(item.rows),
          cols: this.getColumnsArray(item.colu),
          specialSeats: item.specialSeats,
        });
      });
  }
}
