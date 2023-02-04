import { Component, inject } from '@angular/core';
import { SelectedShowStatfullService } from 'src/app/shared/services/selectedShow.statefull.service';
import { SelectedMovieStatfullService } from '../../shared/services/selectedMovie.statefull.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
})
export class SeatsComponet {
  private selectedMovieService = inject(SelectedMovieStatfullService);
  private selectedShowService = inject(SelectedShowStatfullService);

  selectedMovie$ = this.selectedMovieService.selectedMovie$;
  selectedShow$ = this.selectedShowService.selectedShow$;
  selectedDate = this.selectedMovieService.selectedDate;
}
