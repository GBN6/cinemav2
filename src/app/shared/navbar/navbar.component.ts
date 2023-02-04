import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, CommonModule, FontAwesomeModule],
})
export class NavbarComponent {
  ticketsInCart = 0;
  cart = faCartShopping;
  loggedIn = false;

  userLoggedIn = {
    id: 1,
    userName: 'Janek',
  };
}
