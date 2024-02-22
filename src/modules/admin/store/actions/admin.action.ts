
export class AddEmployee {
    static readonly type = '[Add Employee] Add Employee';
    constructor(public payload: any) { }
}
export class GetEmployees {
    static readonly type = '[Get Employees] Get Employees';
    constructor() { }
}