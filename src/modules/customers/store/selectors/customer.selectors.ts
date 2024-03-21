import { Selector } from '@ngxs/store';
import { CustomersState, CustomersStateModel } from '../state/customer.state';

export class CustomersSelectors {
    @Selector([CustomersState])
    static GetCustomersList(state: CustomersStateModel) {
        return state.customerList;
    }
    @Selector([CustomersState])
    static GetCartList(state: CustomersStateModel) {
        return state.cartList;
    }
}
