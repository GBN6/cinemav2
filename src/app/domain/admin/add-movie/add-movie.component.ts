import { Component, inject } from '@angular/core';
import { AdminPanelService } from '../admin.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent {
  private adminPanelService = inject(AdminPanelService);

  movieGenres$ = this.adminPanelService.getAllGenres();
  moviePegi$ = this.adminPanelService.getAllPegiRatings();
}
