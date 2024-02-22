import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthSelectors } from '../store/selectors/auth.selector'; // Import your AuthSelectors
import { SetIsLoggedIn } from '../store/actions/auth.action';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select(AuthSelectors.GetIsUserLoggedIn).pipe(
            map((data: { isLoggedIn: boolean, userId: string }) => {
                console.log("auth guard")
                if (data.isLoggedIn) {
                    return this.canUserAccessRoute(route.data['roles']);
                } else {
                    const access_token = sessionStorage.getItem('access_token');
                    if (access_token != null) {
                        this.store.dispatch(new SetIsLoggedIn(true));
                        return this.canUserAccessRoute(route.data['roles']);
                    } else {
                        this.store.dispatch(new SetIsLoggedIn(false));
                        this.router.navigateByUrl('/auth/login');
                        return false;
                    }
                }
            })
        );
    }

    canUserAccessRoute(routeRoles) {
        const decodedToken = jwtDecode(window.sessionStorage.getItem('access_token'));
        const token_roles = decodedToken['user']['roles'];
        console.log("decodedToken", decodedToken, routeRoles);
        let count = 0;
        for (const role of token_roles) {
            console.log("for loop", routeRoles.includes(role), role)
            if (routeRoles.includes(role.toLowerCase())) {
                count++;
            }
        }
        console.log("count", count)
        if (count > 0) {
            return true;
        } else {
            this.router.navigateByUrl('/');
            return false;
        }
    }
}

