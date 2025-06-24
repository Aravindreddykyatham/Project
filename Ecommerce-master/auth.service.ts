import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interface/login.interface';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}

  isAutehnticated(): boolean {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      return true;
    } else return false;
  }

  checkAuth(username: string, password: string): Observable<User> {
    return this.http.post(`${this.apiUrl}/login`, {
      username,
      password,
    }) as Observable<User>;
  }
}
