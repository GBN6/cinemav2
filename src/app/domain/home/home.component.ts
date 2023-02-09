import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from 'src/app/shared/cart/cart.component';
import { CartService } from 'src/app/shared/cart/cart.service';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CartComponent, CommonModule],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <ng-container *ngIf="cartStatus$ | async as cartStatus">
      <ng-container *ngIf="cartStatus.cartOpen">
        <app-cart></app-cart>
      </ng-container>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private cartService = inject(CartService);

  cartStatus$ = this.cartService.cartStatus$;
}
