import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { EmployeeDetailsHelper } from "../../schema/models/user.model";
import { EmployeeDetails } from "../../schema/interfaces/user.interface";
import { GetEmployeeDetails, Login, Logout, SetIsLoggedIn, SignUp } from "../actions/auth.action";
import { ApiService } from "../../services/api.service";
import { tap } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";

export class AuthStateModel {
    userDetails: EmployeeDetails;
    isLoggedIn: boolean;
}
@State<AuthStateModel>({
    name: 'User',
    defaults: {
        userDetails: EmployeeDetailsHelper.createFromResponse({}),
        isLoggedIn: false
    },
})
@Injectable()
export class AuthState {
    constructor(private apiService: ApiService,
        private router: Router
    ) {
    }

    @Action(Login)
    login(
        { patchState }: StateContext<AuthStateModel>,
        { payload }: Login
    ) {
        return this.apiService.login(payload).pipe(
            tap(
                (res: { token: string, userDetails: EmployeeDetails }) => {
                    window.sessionStorage.setItem('access_token', res.token);
                    patchState({
                        userDetails: res.userDetails,
                        isLoggedIn: true
                    });
                },
                (error) => {
                    return error;
                }
            )
        );
    }
    @Action(SignUp)
    signUp(
        { patchState }: StateContext<AuthStateModel>,
        { payload }: SignUp
    ) {
        return this.apiService.signUp(payload).pipe(
            tap(
                (r: EmployeeDetails) => {
                    patchState({
                        userDetails: r,
                    });
                },
                (error) => {
                    return error;
                }
            )
        );
    }
    @Action(SetIsLoggedIn)
    setIsLoggedIn(
        { patchState, dispatch }: StateContext<AuthStateModel>,
        { isLoggedIn }: SetIsLoggedIn
    ) {
        const decodedToken = jwtDecode(window.sessionStorage.getItem('access_token'));
        const user = decodedToken['user'];
        patchState({
            isLoggedIn: isLoggedIn,
        });
        dispatch(new GetEmployeeDetails(user._id))
    }
    @Action(Logout)
    logout(
        { patchState }: StateContext<AuthStateModel>
    ) {
        return this.apiService.logout().pipe(
            tap(
                (r: EmployeeDetails) => {
                    window.sessionStorage.removeItem('access_token');
                    patchState({
                        userDetails: null,
                        isLoggedIn: false
                    });
                    this.router.navigateByUrl("/auth/login")
                },
                (error) => {
                    return error;
                }
            )
        );
    }
    @Action(GetEmployeeDetails)
    getEmployeeDetails(
        { patchState }: StateContext<AuthStateModel>,
        { empId }: GetEmployeeDetails
    ) {
        return this.apiService.getEmployeeDetails(empId).pipe(
            tap(
                (r: EmployeeDetails) => {
                    patchState({
                        userDetails: r
                    });
                },
                (error) => {
                    return error;
                }
            )
        );
    }
}