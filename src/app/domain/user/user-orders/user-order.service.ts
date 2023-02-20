import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { selectUserId } from 'src/app/auth/store/auth.selectors';
import { UserOrders } from './user-order.interface';

@Injectable()
export class UserOrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  private store = inject<Store<AppState>>(Store);
  userId: number | null = null;

  constructor() {
    this.store
      .select(selectUserId)
      .pipe(take(1))
      .subscribe((result) => {
        this.userId = result;
      });
  }

  getUserOrders() {
    return this.http.get<UserOrders[]>(
      this.apiUrl + `/users/${this.userId}/orders`
    );
  }
}
