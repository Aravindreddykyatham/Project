import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserType } from '../enums/UserTypeEnum';

@Injectable({
  providedIn: 'root',
})
export class SellerGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): MaybeAsync<GuardResult> {
    if (
      this.userService.getUser() &&
      this.userService.getUser()?.userType === UserType.SELLER
    ) {
      return true;
    } else {
      this.router.navigate([`home`]);
      return false;
    }
  }
}
