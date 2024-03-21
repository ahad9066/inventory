import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Order } from 'src/modules/orders/schema/interface/orders.interface';
import { OrdersSelectors } from 'src/modules/orders/store/selectors/orders.selectors';
import { SharedService } from 'src/modules/shared/services/shared.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit, OnDestroy {
  fetching = true;
  showError = false;
  errorMsg = null;
  dataSource = null;
  ordersList: Order[] = [];
  readonly subscriptions: Array<Subscription> = [];
  @Select(OrdersSelectors.GetOrdersList) orderList$: Observable<Order[]>;
  constructor(private store: Store, private sharedService: SharedService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getOrders().subscribe((res: any) => {
      this.ordersList = res.orders;
      console.log("Resss", res);
      this.prepareCharts();

    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.sharedService.showErrors("'Something went wrong! please try again!'");
    })
    this.listenToOrders();
  }
  prepareCharts() {
    let pending = 0;
    let completed = 0;
    let cancelled = 0;
    this.ordersList.forEach(order => {
      if (order.status == 'payment_initiated') {
        pending++;
      } else if (order.status == 'payment_done' || order.status == 'order_shipped') {
        completed++;
      } else {
        cancelled++;
      }
    })
    const chartData = [
      {
        label: "Pending Orders",
        value: pending
      },
      {
        label: "Completed Orders",
        value: completed
      },
      {
        label: "Cancelled Orders",
        value: cancelled
      },
    ];
    this.dataSource = {
      chart: {
        caption: "Orders distribution", //Set the chart caption
        // subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
        xAxisName: "Order Types", //Set the x-axis name
        yAxisName: "Number of orders", //Set the y-axis name
        theme: "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData
    };
    this.fetching = false;
  }
  listenToOrders() {
    this.subscriptions.push(
      this.orderList$.subscribe((res) => {
        this.ordersList = res.filter(order => order.status == 'payment_initiated');
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
