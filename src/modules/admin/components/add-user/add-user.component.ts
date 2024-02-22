import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as _ from 'lodash'
import { Subscription } from 'rxjs';
import { SharedService } from 'src/modules/shared/services/shared.service';
import { AddEmployee } from '../../store/actions/admin.action';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  addEmployeeForm: any;
  fetching = false;
  showPass = false;
  rolesList = ['ADMIN', 'SALES', 'MANAGER'];
  readonly subscriptions: Array<Subscription> = [];

  constructor(private fb: FormBuilder, private sharedService: SharedService,
    private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.pattern('^([A-Za-z\\s]{2,25})$')]],
        lastName: ['', [Validators.required, Validators.pattern('^([A-Za-z\\s]{2,25})$')]],
        mobile: ['', [Validators.required, Validators.pattern('^([0-9]{10})$')]],
        password: ['', [Validators.required, Validators.pattern('^([A-Za-z0-9*$@._-]{5,25})$')]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$'),
          ],
        ],
        roles: [, Validators.required]
      },
    );
  }
  reset() {
    this.addEmployeeForm.reset();
  }
  submit() {
    console.log('submit', this.addEmployeeForm)
    console.log('submit value', this.addEmployeeForm.value)
    if (this.addEmployeeForm.valid) {
      this.fetching = true;
      const dataToSubmit = {};
      _.set(dataToSubmit, 'firstName', this.addEmployeeForm.value.firstName);
      _.set(dataToSubmit, 'lastName', this.addEmployeeForm.value.lastName);
      _.set(dataToSubmit, 'countryCode', '+1');
      _.set(dataToSubmit, 'mobile', this.addEmployeeForm.value.mobile);
      _.set(dataToSubmit, 'email', this.addEmployeeForm.value.email);
      _.set(dataToSubmit, 'password', this.addEmployeeForm.value.password);
      _.set(dataToSubmit, 'roles', this.addEmployeeForm.value.roles);
      _.set(dataToSubmit, 'isMobileVerified', false);
      _.set(dataToSubmit, 'isEmailVerified', false);
      this.subscriptions.push(
        this.store.dispatch(new AddEmployee(dataToSubmit)).subscribe(
          () => {
            this.sharedService.showSuccess("Employee added successfully!")
            this.router.navigate(['/admin/employeesList']);
          },
          (error: HttpErrorResponse) => {
            console.error('error: ', error);
            this.fetching = false;
            this.sharedService.showErrors("'Something went wrong! please try again!'");
          }
        )
      );
    } else {
      this.sharedService.showErrors("Please fill the form")
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
