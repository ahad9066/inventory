import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  perms = [
    {
      name: "Inventory",
      icon: "fa-solid fa-warehouse me-2 color-raw-umber ",
      pages: [
        {
          route: '/inventory/items',
          name: "Items"
        },
        {
          route: '/inventory/salesreport',
          name: "Sales Report"
        }
      ]
    },
    {
      name: "Orders",
      icon: "fa-solid fa-cart-shopping  me-2 color-raw-umber",
      pages: [
        {
          route: '/orders/items',
          name: "Pending Orders"
        },
        {
          route: '/orders/salesreport',
          name: "Completed Orders"
        }
      ]
    },
    {
      name: "Invoice",
      icon: "fa-solid fa-file-invoice  me-2 color-raw-umber",
      pages: [
        {
          route: '/invoice/items',
          name: "Generate invoice"
        },
        {
          route: '/invoice/salesreport',
          name: "Past Invoice"
        }
      ]
    },
    {
      name: "Customers",
      icon: "fa-solid fa-file-invoice  me-2 color-raw-umber",
      pages: [
        {
          route: '/customers/items',
          name: "User List"
        },
        {
          route: '/customers/salesreport',
          name: "User Carts"
        }
      ]
    }
  ];
  currentUrl = null;
  currentModule = '';
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("im onint", this.router.url)
    this.currentModule = this.router.url.split('/')[1];
    this.currentUrl = this.router.url;
    console.log("im onint", this.currentUrl, this.currentModule)
  }

}
