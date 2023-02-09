import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TicketState } from 'src/app/shared/services/state.interface';
import { TicketStateService } from 'src/app/shared/services/ticket.state.service';
import { SelectedMovieStatfullService } from '../../shared/services/selected-movie.state.service';
import { SeatsService } from './seats.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatsComponet {
  private selectedStateService = inject(SelectedMovieStatfullService);
  private ticketStateService = inject(TicketStateService);

  private subscriptions = new Subscription();

  selectedState$ = this.selectedStateService.movieState$;
  ticketState$: Observable<TicketState[]> | null = null;

  getFilteredTickets() {
    const sub = this.selectedStateService.movieState$.subscribe((result) => {
      this.ticketState$ = this.ticketStateService.getSelectedShowTickets(
        result.selectedDate,
        result.selectedMovie,
        result.selectedShow
      );
    });
    this.subscriptions.add(sub);
  }

  ngOnInit() {
    this.getFilteredTickets();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
