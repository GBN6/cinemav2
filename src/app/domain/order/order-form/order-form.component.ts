import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { selectData } from 'src/app/auth/store/auth.selectors';
import { UserData } from '../order.interface';

const emailConfirm: ValidatorFn = (control: AbstractControl) => {
  const email = control.get('userMail');
  const confirmEmail = control.get('userMailConfirmation');
  return email?.value === confirmEmail?.value ? null : { emailMismatch: true };
};

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Output() userDataForm = new EventEmitter<UserData>();
  @Output() openModal = new EventEmitter<boolean>();

  private fb = inject(NonNullableFormBuilder);
  private store = inject<Store<AppState>>(Store);

  orderForm = this.fb.group(
    {
      isInvoiceNeeded: this.fb.control(false),
      userName: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(50),
        ],
      }),
      userLastName: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(50),
        ],
      }),
      userPhoneNumber: this.fb.control('', {
        validators: [
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(9),
          Validators.maxLength(9),
        ],
      }),
      userMail: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,7}$'),
        ],
      }),
      userMailConfirmation: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,7}$'),
        ],
      }),
      userInvoiceForm: this.fb.group({
        userNIP: this.fb.control(
          { disabled: true, value: '' },
          {
            validators: [
              Validators.required,
              Validators.pattern('^[0-9]*$'),
              Validators.minLength(10),
              Validators.maxLength(10),
            ],
          }
        ),
        userStreet: this.fb.control(
          { disabled: true, value: '' },
          {
            validators: [Validators.required, Validators.maxLength(50)],
          }
        ),
        userPostCode: this.fb.control(
          { disabled: true, value: '' },
          {
            validators: [
              Validators.required,
              Validators.pattern('[0-9]{2}-[0-9]{3}'),
            ],
          }
        ),
        userCity: this.fb.control(
          { disabled: true, value: '' },
          {
            validators: [
              Validators.required,
              Validators.pattern('[a-zA-Z ]*'),
              Validators.maxLength(50),
            ],
          }
        ),
      }),
      userNewsletter: this.fb.control(false),
      discountCode: this.fb.control('', {
        validators: [Validators.pattern('^[a-zA-Z0-9]{7}$')],
      }),
    },
    { validators: [emailConfirm] }
  );

  enableInvoiceForm() {
    this.orderForm.controls.isInvoiceNeeded.valueChanges.subscribe((value) => {
      if (value) {
        this.orderForm.controls.userInvoiceForm.controls.userCity.enable();
        this.orderForm.controls.userInvoiceForm.controls.userNIP.enable();
        this.orderForm.controls.userInvoiceForm.controls.userPostCode.enable();
        this.orderForm.controls.userInvoiceForm.controls.userStreet.enable();
      } else {
        this.orderForm.controls.userInvoiceForm.controls.userCity.disable();
        this.orderForm.controls.userInvoiceForm.controls.userNIP.disable();
        this.orderForm.controls.userInvoiceForm.controls.userPostCode.disable();
        this.orderForm.controls.userInvoiceForm.controls.userStreet.disable();
      }
    });
  }

  submitUserForm() {
    this.orderForm.markAllAsTouched();
    if (this.orderForm.invalid) {
      return;
    }
    // handle...
    this.userDataForm.emit(this.orderForm.getRawValue());
    this.openModal.emit(true);
  }

  ngOnInit(): void {
    this.store
      .select(selectData)
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.orderForm.controls.userName.setValue(result.userFirstName);
          this.orderForm.controls.userLastName.setValue(result.userLastName);
          this.orderForm.controls.userMail.setValue(result.userEmail);
          this.orderForm.controls.userMailConfirmation.setValue(
            result.userEmail
          );
          if (result.userPhone)
            this.orderForm.controls.userPhoneNumber.setValue(result.userPhone);
        }
      });
  }
}
