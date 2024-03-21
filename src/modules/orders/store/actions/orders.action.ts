
export class GetOrders {
    static readonly type = '[Orders] Get Orders';
    constructor() { }
}
export class UpdatePaymentStatus {
    static readonly type = '[Pending Orders] Update Payment Status';
    constructor(public payload: any) { }
}
