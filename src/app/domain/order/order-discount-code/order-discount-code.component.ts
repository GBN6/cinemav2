import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ErrorhandlerService } from 'src/app/core/interceptor/error-handler.service';
import { DiscountCodeValidator } from 'src/app/shared/validators/discount-code.validator';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-discount-code',
  templateUrl: './order-discount-code.component.html',
  styleUrls: ['./order-discount-code.component.scss'],
  providers: [],
})
export default class OrderDiscountCodeComponent {
  @Output() discountCodeEvent = new EventEmitter<string>();

  private fb = inject(NonNullableFormBuilder);
  private discountCodeValidator = inject(DiscountCodeValidator);
  private errorService = inject(ErrorhandlerService);
  private orderService = inject(OrderService);

  discountCodeForm = this.createForm();
  discountCode$ = this.orderService.discount$;
  errorHandler$ = this.errorService.error$;

  ngOnInit() {
    this.discountCodeForm.controls.discountCode.valueChanges.pipe(
      debounceTime(1000)
    );
  }

  get codeCtrl() {
    return this.discountCodeForm.controls.discountCode;
  }

  handleSubmit() {
    this.discountCodeForm.markAllAsTouched();
    if (this.discountCodeForm.invalid) return;

    this.discountCode$.subscribe((result) => {
      if (result) {
        return;
      }
      this.discountCodeEvent.emit(this.codeCtrl.value);
    });
  }

  cancelCoupon() {
    this.discountCodeForm.reset();
  }

  private createForm() {
    return this.fb.group({
      discountCode: this.fb.control('', {
        asyncValidators: [
          this.discountCodeValidator.validate.bind(this.discountCodeValidator),
        ],
      }),
    });
  }
}
