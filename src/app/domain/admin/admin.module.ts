import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AdminPanelService } from './admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddMovieFormComponent } from './add-movie/add-movie/add-movie-form.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NumbersOnlyDirective } from 'src/app/shared/directives/numbersOnly.directive';

@NgModule({
  declarations: [AdminPanelComponent, AddMovieComponent, AddMovieFormComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminPanelComponent,
      },
      {
        path: 'add-movie',
        component: AddMovieComponent,
      },
    ]),
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatCheckboxModule,
    MatRadioModule,
    NumbersOnlyDirective,
  ],
  providers: [AdminPanelService],
})
export default class AdminModule {}
