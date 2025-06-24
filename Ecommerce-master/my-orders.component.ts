import { Component } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import {
  UserOrder,
  UserOrderItems,
} from '../../shared/interface/userOrders.interface';
import { User } from '../../shared/interface/user.interface';
import { UserService } from '../../shared/services/user.service';
import { UserType } from '../../shared/enums/UserTypeEnum';
import { UpdateStatus } from '../../shared/interface/UpdateStatus.intercface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  orders!: Array<UserOrder>;
  user!: User | null;
  seller: any = true;

  statusList: string[] = ['PENDING', 'DELIVERED', 'CANCELLED', 'SHIPPED'];
  sellerOrderItems!: Array<UserOrderItems>;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.user = this.userService.getUser();

    if (this.user) {
      if (this.user.userType === UserType.CUSTOMER) {
        this.seller = false;
        this.orderService.getUserOrders(this.user.id).subscribe((data) => {
          this.orders = data;
        });
      } else {
        this.orderService.getSellerOrders(this.user.id).subscribe((data) => {
          this.sellerOrderItems = data;
        });
      }
    }
  }
  changeStatus(event: any, orderItemId: number, currentStatus: String) {
    console.log(this.sellerOrderItems);
    console.log(event);
    if (this.user) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirm change status',
          message: 'Are you sure you want to change the status?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true && this.user) {
          const updateStatus: UpdateStatus = {
            sellerId: this.user.id,
            orderItemId: orderItemId,
            status: event,
          };
          this.orderService.chaneStatus(updateStatus).subscribe(console.log);
        } else {
          if (this.user) {
            this.orderService
              .getSellerOrders(this.user.id)
              .subscribe((data) => {
                this.sellerOrderItems = data;
              });
          }
        }
      });
    }
  }
}
