import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { ApiService } from "../../services/api.service";
import { tap } from "rxjs";
import { GetOrders, UpdatePaymentStatus } from "../actions/orders.action";
import { Order } from "../../schema/interface/orders.interface";

export class OrdersStateModel {
    ordersList: Order[] | []
}
@State<OrdersStateModel>({
    name: 'Orders',
    defaults: {
        ordersList: []
    },
})
@Injectable()
export class OrdersState {
    constructor(private apiService: ApiService
    ) {
    }

    @Action(GetOrders)
    getEmployees(
        { patchState }: StateContext<OrdersStateModel>
    ) {
        return this.apiService.getOrders().pipe(
            tap(
                (r: any) => {
                    patchState({
                        ordersList: r.orders,
                    });
                },
                (error) => {
                    return error;
                }
            )
        );
    }

    @Action(UpdatePaymentStatus)
    updatePaymentStatus(
        { patchState, getState }: StateContext<OrdersStateModel>,
        { payload }: UpdatePaymentStatus
    ) {
        return this.apiService.updatePaymentStatus(payload).pipe(
            tap(
                (res: any) => {
                    const list = getState().ordersList.map(order =>
                        order.orderId == res.orderId ? res : order)
                    patchState({
                        ordersList: list,
                    });
                },
                (error) => {
                    return error;
                }
            )
        );
    }

}