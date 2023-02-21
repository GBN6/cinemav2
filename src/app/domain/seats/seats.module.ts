import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.compononet';
import { SeatsComponet } from './seats.component';
import { SeatsService } from './seats.service';
import { SeatsGridComponent } from './seats-grid/seats-grid.component';
import { SeatsSelectedComponent } from './seat-selected/seats-selected.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatLoaderComponent } from 'src/app/core/loader/loader.component';
import { ErrorComponent } from 'src/app/core/error/error.component';
ErrorComponent;

@NgModule({
  declarations: [SeatsComponet, SeatsGridComponent, SeatsSelectedComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SeatsComponet,
      },
    ]),
    CommonModule,
    FooterComponent,
    FormsModule,
    FontAwesomeModule,
    ErrorComponent,
    MatLoaderComponent,
  ],
  providers: [SeatsService],
})
export default class SeatsModule {}
