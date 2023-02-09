import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private isCartOpen$$ = new BehaviorSubject({ cartOpen: false });

  get cartStatus$() {
    return this.isCartOpen$$.asObservable();
  }

  openCart() {
    this.isCartOpen$$.next({ cartOpen: true });
  }

  closeCart() {
    this.isCartOpen$$.next({ cartOpen: false });
  }
}
