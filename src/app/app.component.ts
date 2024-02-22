import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, filter } from 'rxjs';
import { SetIsLoggedIn } from 'src/modules/auth/store/actions/auth.action';
import { AuthSelectors } from 'src/modules/auth/store/selectors/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  @Select(AuthSelectors.GetIsUserLoggedIn) userLoggedIn$: Observable<{ isLoggedIn: boolean, userId: string }>;
  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.userLoggedIn$.subscribe((r) => {
      this.isAuthenticated = r.isLoggedIn;
      if (this.isAuthenticated == false) {
        const access_token = sessionStorage.getItem('access_token');
        if (access_token != null) {
          this.store.dispatch(new SetIsLoggedIn(true));
        } else {
          this.router.navigateByUrl('/auth/login');
        }
      }
    });
  }

}
