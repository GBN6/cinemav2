import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginApiResponse, LoginCredentials, User } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);

  getUser(userId: number) {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  login(loginCredentials: LoginCredentials) {
    return this.http.post<LoginApiResponse>(
      `${this.apiUrl}/login`,
      loginCredentials
    );
  }
}
