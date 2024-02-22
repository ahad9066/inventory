import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Logout } from 'src/modules/auth/store/actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userId = null;
  subs: Subscription[] = [];
  cartItemsLength = 0;
  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.store.subscribe(res => {
      this.isLoggedIn = res.User.isLoggedIn;
    })
  }
  login() {
    this.router.navigateByUrl('/auth/login');
  }
  logout() {
    this.store.dispatch(new Logout())
  }
  ngOnDestroy() {
    this.subs.forEach((data) => data.unsubscribe());
  }
  home() {
    this.router.navigateByUrl('/')
  }
}
