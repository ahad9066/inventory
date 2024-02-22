import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { GetEmployees } from '../../store/actions/admin.action';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/modules/shared/services/shared.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  fetching = true;
  readonly subscriptions: Array<Subscription> = [];
  employeeList = [];
  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'mobile', 'email'];
  constructor(private store: Store, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.store.dispatch(new GetEmployees).subscribe(res => {
      this.employeeList = res.Admin.employees;
      console.log("Resss", res);
      this.fetching = false;
    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.sharedService.showErrors("'Something went wrong! please try again!'");
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
