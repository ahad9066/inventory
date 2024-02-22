import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { ApiService } from "../../services/api.service";
import { tap } from "rxjs";
import { AddEmployee, GetEmployees } from "../actions/admin.action";

export class AdminStateModel {
    employees: []
}
@State<AdminStateModel>({
    name: 'Admin',
    defaults: {
        employees: []
    },
})
@Injectable()
export class AdminState {
    constructor(private apiService: ApiService
    ) {
    }
    @Action(AddEmployee)
    addEmployee(
        { patchState }: StateContext<AdminStateModel>,
        { payload }: AddEmployee
    ) {
        return this.apiService.addEmployee(payload).pipe(
            tap(
                (r) => {

                },
                (error) => {
                    return error;
                }
            )
        );
    }

    @Action(GetEmployees)
    getEmployees(
        { patchState }: StateContext<AdminStateModel>
    ) {
        return this.apiService.getEmployees().pipe(
            tap(
                (r: any) => {
                    patchState({
                        employees: r.employees,
                    });
                },
                (error) => {
                    return error;
                }
            )
        );
    }

}