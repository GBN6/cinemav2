import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.compononet';
import { SeatsComponet } from './seats.component';

import { SeatsService } from './seats.service';

@NgModule({
  declarations: [SeatsComponet],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SeatsComponet,
      },
    ]),
    CommonModule,
    FooterComponent,
  ],
  providers: [SeatsService],
})
export default class SeatsModule {}
