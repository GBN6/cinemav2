import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NumbersOnlyDirective } from 'src/app/shared/directives/numbersOnly.directive';
import OrderDiscountCodeComponent from './order-discount-code/order-discount-code.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderComponent } from './order.component';
import { MatButtonModule } from '@angular/material/button';
import { MatLoaderComponent } from 'src/app/core/loader/loader.component';
import { ErrorComponent } from 'src/app/core/error/error.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderFormComponent,
    OrderDiscountCodeComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrderComponent,
      },
      {
        path: 'summarize',
        loadComponent: () => import('../order/summarize/summarize.component'),
      },
    ]),
    CommonModule,
    FormsModule,
    NumbersOnlyDirective,
    ReactiveFormsModule,
    MatButtonModule,
    MatLoaderComponent,
    ErrorComponent,
  ],
  providers: [],
})
export default class OrderModule {}
