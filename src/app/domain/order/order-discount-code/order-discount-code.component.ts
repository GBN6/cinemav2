import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DiscountCodeValidator } from 'src/app/shared/validators/discount-code.validator';

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

  discountCodeForm = this.createForm();

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

    this.discountCodeEvent.emit(this.codeCtrl.value);
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
