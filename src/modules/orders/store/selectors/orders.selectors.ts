import { Selector } from '@ngxs/store';
import { OrdersState, OrdersStateModel } from '../state/orders.state';

export class OrdersSelectors {
    @Selector([OrdersState])
    static GetOrdersList(state: OrdersStateModel) {
        return state.ordersList;
    }
}
