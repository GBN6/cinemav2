import { Component, inject, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { AdminPanelService } from '../admin.service';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.scss'],
})
export class AddShowComponent {
  private adminPanelService = inject(AdminPanelService);

  movies$ = this.adminPanelService.getAllMovies();
  screens$ = this.adminPanelService.getAllScreens();

  newShowData$ = combineLatest([this.movies$, this.screens$]);
}
