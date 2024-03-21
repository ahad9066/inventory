import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/modules/shared/services/shared.service';
import { GetCartList, GetCustomersList } from '../../store/actions/customer.action';

@Component({
  selector: 'app-user-carts',
  templateUrl: './user-carts.component.html',
  styleUrls: ['./user-carts.component.scss']
})
export class UserCartsComponent implements OnInit, OnDestroy {
  @ViewChild('customerDetailsTemplate') customerDetailsTemplate: TemplateRef<any>;
  fetching = true;
  readonly subscriptions: Array<Subscription> = [];
  cartList = [];
  displayedColumns: string[] = ['index', 'productName', 'subGradeName', 'size', 'quantity', 'price', 'totalPrice'];

  constructor(private store: Store, private sharedService: SharedService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(new GetCartList).subscribe(res => {
      this.cartList = res.Customers.cartList;
      console.log("Resss", res);
      this.fetching = false;
    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.sharedService.showErrors("'Something went wrong! please try again!'");
    })
  }
  showUserDetails(user: any) {
    // console.log("row", user)
    // this.selectedUser = user;
    // const dialogRef = this.dialog.open(this.customerDetailsTemplate, {
    //   width: '800px',
    //   height: '500px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialog was closed');
    // });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
