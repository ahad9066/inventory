import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';
import { CancelledOrdersComponent } from './components/cancelled-orders/cancelled-orders.component';

const routes: Routes = [
    {
        path: 'pendingOrders',
        component: PendingOrdersComponent
    },
    {
        path: 'completedOrders',
        component: CompletedOrdersComponent
    },
    {
        path: 'cancelledOrders',
        component: CancelledOrdersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersRoutingModule { }
