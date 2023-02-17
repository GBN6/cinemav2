import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NumbersOnlyDirective } from 'src/app/shared/directives/numbersOnly.directive';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderComponent } from './order.component';

@NgModule({
  declarations: [OrderComponent, OrderFormComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrderComponent,
      },
    ]),
    CommonModule,
    FormsModule,
    NumbersOnlyDirective,
    ReactiveFormsModule,
  ],
  providers: [],
})
export default class OrderModule {}
