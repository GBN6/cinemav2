import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { SelectedMovieStatfullService } from '../services/selected-movie.state.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedMovieGuard implements CanActivate {
  private router = inject(Router);
  private selectedMovieService = inject(SelectedMovieStatfullService);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.selectedMovieService.movieState$.pipe(
      map((r) => {
        if (r.selectedMovie === undefined) {
          console.log('failure');
          this.router.navigateByUrl('');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
