import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Order } from '../../schema/interface/orders.interface';
import { Subscription } from 'rxjs';
import { GetOrders } from '../../store/actions/orders.action';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/modules/shared/services/shared.service';

@Component({
  selector: 'app-cancelled-orders',
  templateUrl: './cancelled-orders.component.html',
  styleUrls: ['./cancelled-orders.component.scss']
})
export class CancelledOrdersComponent implements OnInit {
  fetching = true;
  ordersList: Order[] = [];
  readonly subscriptions: Array<Subscription> = [];
  displayedColumns: string[] = ['index', 'productName', 'subGradeName', 'size', 'quantity', 'price', 'totalPrice'];

  constructor(private store: Store, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.store.dispatch(new GetOrders).subscribe(res => {
      this.ordersList = res.Orders.ordersList.filter(order => order.status == "order_cancelled");
      console.log("Resss", res);
      this.fetching = false;
    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.sharedService.showErrors("'Something went wrong! please try again!'");
    })
  }

}
