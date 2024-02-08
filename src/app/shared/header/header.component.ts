import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    this.router.navigateByUrl('/auth/login');
  }
  logout() {
  }
  ngOnDestroy() {
    this.subs.forEach((data) => data.unsubscribe());
  }
  home() {
    this.router.navigateByUrl('/')
  }
}
