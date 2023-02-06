import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderComponent } from './order.component';
import { OrderService } from './order.service';

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
    ReactiveFormsModule,
  ],
  providers: [],
})
export default class OrderModule {}
