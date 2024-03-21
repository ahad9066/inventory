import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Subscription, Observable } from 'rxjs';
import { Order } from '../../schema/interface/orders.interface';
import { OrdersSelectors } from '../../store/selectors/orders.selectors';
import { SharedService } from 'src/modules/shared/services/shared.service';
import { GetOrders } from '../../store/actions/orders.action';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.scss']
})
export class CompletedOrdersComponent implements OnInit, OnDestroy {
  fetching = true;
  ordersList: Order[] = [];
  readonly subscriptions: Array<Subscription> = [];
  displayedColumns: string[] = ['index', 'productName', 'subGradeName', 'size', 'quantity', 'price', 'totalPrice'];
  @Select(OrdersSelectors.GetOrdersList) orderList$: Observable<Order[]>;
  constructor(private store: Store, private sharedService: SharedService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.dispatch(new GetOrders).subscribe(res => {
        this.ordersList = res.Orders.ordersList.filter(order => order.status == 'payment_done' ||
          order.status == 'order_shipped');
        console.log("Resss", res);
        this.fetching = false;
      }, (error: HttpErrorResponse) => {
        console.error('error: ', error);
        this.fetching = false;
        this.sharedService.showErrors("'Something went wrong! please try again!'");
      })
    );
    this.listenToOrders();
  }
  listenToOrders() {
    this.subscriptions.push(
      this.orderList$.subscribe((res) => {
        this.ordersList = res.filter(order => order.status == 'payment_initiated');
      })
    );
  }
  downloadInvoice(order: Order) {
    this.fetching = true;

    this.apiService.downloadInvoice(order.invoiceFileKey).subscribe((data: Blob) => {
      this.fetching = false;
      // Handle the downloaded file, for example, you can create a download link
      const downloadLink = document.createElement('a');
      const timestamp = new Date().getTime(); // Get current timestamp
      downloadLink.href = window.URL.createObjectURL(data);
      downloadLink.download = `${order.orderId}_invoice_${timestamp}.pdf`; // Add timestamp to filename
      downloadLink.click();
    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.sharedService.showErrors("'Something went wrong! please try again!'");
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
