import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { Discount } from 'src/app/shared/services/state.interface';

@Injectable({
  providedIn: 'root',
})
export class DiscountCodeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  checkIfDiscountCodeExist(value: string) {
    return this.http
      .get<Discount[]>(`${this.apiUrl}/coupons?code=${value}`)
      .pipe(
        switchMap((result) => {
          return of(!!result.length);
        })
      );
  }
}
