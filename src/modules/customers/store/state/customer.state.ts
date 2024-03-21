import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { ApiService } from "../../services/api.service";
import { tap } from "rxjs";
import { GetCartList, GetCustomersList } from "../actions/customer.action";
import { UserDetails } from "../../schema/interfaces/user.interface";

export class CustomersStateModel {
    customerList: UserDetails[] | []
    cartList: []
}
@State<CustomersStateModel>({
    name: 'Customers',
    defaults: {
        customerList: [],
        cartList: []
    },
})
@Injectable()
export class CustomersState {
    constructor(private apiService: ApiService
    ) {
    }

    @Action(GetCustomersList)
    getCustomersList(
        { patchState }: StateContext<CustomersStateModel>
    ) {
        return this.apiService.getCustomers().pipe(
            tap(
                (r: any) => {
                    patchState({
                        customerList: r.users,
                    });
                },
                (error) => {
                    return error;
                }
            )
        );
    }

    @Action(GetCartList)
    getCartList(
        { patchState }: StateContext<CustomersStateModel>
    ) {
        return this.apiService.getCartItems().pipe(
            tap(
                (r: any) => {
                    patchState({
                        cartList: r.cartList,
                    });
                },
                (error) => {
                    return error;
                }
            )
        );
    }



}