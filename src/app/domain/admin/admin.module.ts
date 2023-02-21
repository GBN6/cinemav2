import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AdminPanelService } from './admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddMovieFormComponent } from './add-movie/add-movie-form/add-movie-form.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NumbersOnlyDirective } from 'src/app/shared/directives/numbersOnly.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddShowComponent } from './add-show/add-show.component';
import { AddShowFormComponent } from './add-show/add-show-form/add-show-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLoaderComponent } from 'src/app/core/loader/loader.component';
import { ErrorComponent } from 'src/app/core/error/error.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AddMovieComponent,
    AddMovieFormComponent,
    AddShowComponent,
    AddShowFormComponent,
  ],
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
      {
        path: 'add-show',
        component: AddShowComponent,
      },
    ]),
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatCheckboxModule,
    MatRadioModule,
    NumbersOnlyDirective,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLoaderComponent,
    ErrorComponent,
  ],
  providers: [AdminPanelService],
})
export default class AdminModule {}
