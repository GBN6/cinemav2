import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TicketStateService } from '../services/ticket.state.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedTicketsGuard implements CanActivate {
  private router = inject(Router);
  private ticektStateService = inject(TicketStateService);

  canActivate(): Observable<boolean> {
    return this.ticektStateService.ticketState$.pipe(
      map((r) => {
        if (r.length === 0) {
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
