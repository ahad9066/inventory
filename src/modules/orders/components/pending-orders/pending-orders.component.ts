import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { GetOrders } from '../../store/actions/orders.action';
import { Order } from '../../schema/interface/orders.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/modules/shared/services/shared.service';
import { jwtDecode } from 'jwt-decode';
import { ROLES } from 'src/modules/auth/roles.constants';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit, OnDestroy {
  @ViewChild('updatePaymentTemplate') updatePaymentTemplate: TemplateRef<any>;
  fetching = false;
  ordersList: Order[] = [];
  readonly subscriptions: Array<Subscription> = [];
  currentUserRoles = [];
  isManager = false;
  currentOrder: Order = null;
  currentStatus = null;
  changeStatus = null;
  displayedColumns: string[] = ['index', 'productName', 'subGradeName', 'size', 'quantity', 'price', 'totalPrice'];
  constructor(private store: Store, private sharedService: SharedService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(new GetOrders).subscribe(res => {
      this.ordersList = res.Orders.ordersList;
      console.log("Resss", res);
      this.fetching = false;
    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.sharedService.showErrors("'Something went wrong! please try again!'");
    })
    const token = window.sessionStorage.getItem('access_token');
    if (!!token) {
      const decodedToken = jwtDecode(token);
      this.currentUserRoles = decodedToken['user']['roles'];
      this.isManager = this.currentUserRoles.includes(ROLES.MANAGER.toUpperCase());
      console.log("isMAna", this.isManager, this.currentUserRoles)
    }
  }
  updateOrderStatus(order: Order) {
    this.currentOrder = order;
    this.currentStatus = order.status;
    const dialogRef = this.dialog.open(this.updatePaymentTemplate, {
      width: '600px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
