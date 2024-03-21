import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/modules/shared/services/shared.service';
import { UserDetails } from '../../schema/interfaces/user.interface';
import { GetCustomersList } from '../../store/actions/customer.action';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild('customerDetailsTemplate') customerDetailsTemplate: TemplateRef<any>;
  fetching = true;
  readonly subscriptions: Array<Subscription> = [];
  usersList: UserDetails[] = [];
  selectedUser: UserDetails = null;
  displayedColumns: string[] = ['index', 'customerId', 'firstName', 'lastName', 'mobile', 'email'];

  constructor(private store: Store, private sharedService: SharedService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(new GetCustomersList).subscribe(res => {
      this.usersList = res.Customers.customerList;
      console.log("Resss", res);
      this.fetching = false;
    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.sharedService.showErrors("'Something went wrong! please try again!'");
    })
  }
  showUserDetails(user: UserDetails) {
    console.log("row", user)
    this.selectedUser = user;
    const dialogRef = this.dialog.open(this.customerDetailsTemplate, {
      width: '800px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
    });
  }
  close() {
    this.dialog.closeAll();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
