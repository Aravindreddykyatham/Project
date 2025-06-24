import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interface/user.interface';
import { UserService } from '../services/user.service';
import { UserType } from '../enums/UserTypeEnum';
import { CartService } from '../services/cart.service';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../../store/User/user.selectors';
import { clearUser } from '../../store/User/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  cartItemCount = 0;

  user$: Observable<User | null>;
  userType = UserType;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private cartService: CartService
  ) {
    this.user$ = store.select(selectUser);
    cartService.cart$.subscribe((data) => {
      this.cartItemCount = data.items.length;
    });
  }

  ngOnInit() {
    // this.userService.user$.subscribe((userDetails) => {
    //   this.user = userDetails;
    // });
  }

  gotoAddProduct() {
    this.router.navigate([`add-product`]);
  }
  goToMyOrders() {
    this.router.navigate([`my-orders`]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate([`login`]);
    this.store.dispatch(clearUser());
  }

  goToHome() {
    this.router.navigate([`home`]);
  }
  // isSeller() {
  //   return this.user?.userType === UserType.SELLER;
  // }

  gotocart() {
    this.router.navigate([`cart`]);
  }
}
