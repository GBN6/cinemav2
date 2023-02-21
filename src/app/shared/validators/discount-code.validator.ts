import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, delay, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { DiscountCodeService } from 'src/app/domain/order/order-discount-code/order-discunt-code.service';

@Injectable({
  providedIn: 'root',
})
export class DiscountCodeValidator implements AsyncValidator {
  private dicsountCodeService = inject(DiscountCodeService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(EMPTY).pipe(
      delay(1000),
      switchMap(() => {
        return this.dicsountCodeService
          .checkIfDiscountCodeExist(control.value)
          .pipe(
            map((isExisting) => (isExisting ? null : { isExisting: true })),
            catchError(() => of(null))
          );
      })
    );
  }
}
