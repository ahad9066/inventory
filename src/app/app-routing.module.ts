import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from 'src/modules/auth/components/login/login.component';
import { SignupComponent } from 'src/modules/auth/components/signup/signup.component';
import { ItemsComponent } from './components/items/items.component';
import { AuthGuard } from 'src/modules/auth/guards/auth-guard.service';
import { ROLES } from 'src/modules/auth/roles.constants';
import { SalesReportComponent } from './components/sales-report/sales-report.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: SignupComponent
  },
  {
    path: 'inventory/items',
    component: ItemsComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLES.ADMIN, ROLES.SALES, ROLES.MANAGER] }
  },
  {
    path: 'inventory/salesreport',
    component: SalesReportComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLES.ADMIN, ROLES.SALES, ROLES.MANAGER] }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../wrappers/admin.wrapper').then(
        (m) => m.AdminWrapperModule
      ),
    canActivate: [AuthGuard],
    data: { roles: [ROLES.ADMIN] }
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('../wrappers/orders.wrapper').then(
        (m) => m.OrderWrapperModule
      ),
    canActivate: [AuthGuard],
    data: { roles: [ROLES.ADMIN, ROLES.SALES, ROLES.MANAGER] }
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('../wrappers/customers.wrapper').then(
        (m) => m.CustomersWrapperModule
      ),
    canActivate: [AuthGuard],
    data: { roles: [ROLES.ADMIN, ROLES.SALES, ROLES.MANAGER] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
