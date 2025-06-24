import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;

  public user$: Observable<User | null>;

  constructor() {
    const userData = localStorage.getItem('userDetails');
    const user = userData ? JSON.parse(userData) : null;
    this.userSubject = new BehaviorSubject<User | null>(user);
    this.user$ = this.userSubject.asObservable();
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }
  clearUser() {
    this.userSubject.next(null);
  }
  getUser(): User | null {
    return this.userSubject.value;
  }
}
