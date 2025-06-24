import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { login } from '../../store/User/user.actions';
import { selectUser } from '../../store/User/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    store.select(selectUser).subscribe((user) => {
      if (user) {
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit(): void {
    this.checkLogin();
    this.loginForm = this.fb.group({
      username: ['praveen', [Validators.required]],
      password: ['test1', [Validators.required]],
    });
  }

  checkLogin() {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      this.router.navigate(['home']);
    }
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        login({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
      );

      // this.authService.checkAuth(this.loginForm.value).subscribe(
      //   (data) => {
      //     this.router.navigate(['home']);
      //     const json = JSON.stringify(data);
      //     localStorage.setItem('userDetails', json);
      //     this.userService.setUser(data);
      //     this.toastr.success('logged in');
      //   },
      //   (error) => {
      //     this.toastr.error('please provide valid credentials');
      //   }
      // );
    }
  }
}
