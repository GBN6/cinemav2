import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginApiResponse, LoginData, User } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getUser(userId: number) {
    return this.http.get<User>(this.apiUrl + `/users/${userId}`);
  }

  login(LoginData: LoginData) {
    return this.http.post<LoginApiResponse>(this.apiUrl + `/login`, LoginData);
  }
}
