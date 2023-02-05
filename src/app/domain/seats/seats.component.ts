import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SelectedMovieStatfullService } from '../../shared/services/selectedMovie.statefull.service';
import { SeatsService } from './seats.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatsComponet {
  private selectedStateService = inject(SelectedMovieStatfullService);
  private seastService = inject(SeatsService);

  selectedState$ = this.selectedStateService.movieState$;
}
