import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { loginUserSuccess } from './store/User/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Ecommerce';
  constructor(private router: Router, private store: Store<AppState>) {}
  ngOnInit() {
    this.checkLogin();
  }
  checkLogin() {
    const userDetails = localStorage.getItem('user');

    if (userDetails) {
      this.store.dispatch(loginUserSuccess({ user: JSON.parse(userDetails) }));
      //this.router.navigate(['home']);
    }
  }
}
