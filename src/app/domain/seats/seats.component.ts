import { Component, inject } from '@angular/core';
import { SelectedMovieStatfullService } from '../../shared/services/selectedMovie.statefull.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
})
export class SeatsComponet {
  private selectedStateService = inject(SelectedMovieStatfullService);

  selectedState$ = this.selectedStateService.movieState$;
}
