import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCartsComponent } from './components/user-carts/user-carts.component';

const routes: Routes = [
    {
        path: 'list',
        component: UserListComponent
    },
    {
        path: 'cart',
        component: UserCartsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomersRoutingModule { }
