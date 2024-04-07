import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { jwtDecode } from 'jwt-decode';
import { filter } from 'rxjs';
import { ROLES } from 'src/modules/auth/roles.constants';

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
      roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.SALES],
      pages: [
        {
          route: '/inventory/items',
          name: "Items",
          roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.SALES],
        },
        {
          route: '/inventory/rawMaterials',
          name: "Raw Materials",
          roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.SALES],
        },
        {
          route: '/inventory/salesreport',
          name: "Sales Report",
          roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.SALES],
        }
      ]
    },
    {
      name: "Orders",
      icon: "fa-solid fa-cart-shopping  me-2 color-raw-umber",
      roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.SALES],
      pages: [
        {
          route: '/orders/pendingOrders',
          name: "Pending Orders"
        },
        {
          route: '/orders/completedOrders',
          name: "Completed Orders"
        },
        {
          route: '/orders/cancelledOrders',
          name: "Cancelled Orders"
        }
      ]
    },
    // {
    //   name: "Invoice",
    //   icon: "fa-solid fa-file-invoice  me-2 color-raw-umber",
    //   roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.SALES],
    //   pages: [
    //     {
    //       route: '/invoice/items',
    //       name: "Generate invoice"
    //     },
    //     {
    //       route: '/invoice/salesreport',
    //       name: "Past Invoice"
    //     }
    //   ]
    // },
    {
      name: "Customers",
      icon: "fa-solid fa-file-invoice  me-2 color-raw-umber",
      roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.SALES],
      pages: [
        {
          route: '/customers/list',
          name: "User List"
        },
        {
          route: '/customers/cart',
          name: "User Carts"
        }
      ]
    },
    {
      name: "Admin",
      icon: "fa-solid fa-user-tie me-2 color-raw-umber",
      roles: [ROLES.ADMIN],
      pages: [
        {
          route: '/admin/addEmployee',
          name: "Add Employees",
          roles: [ROLES.ADMIN],
        },
        {
          route: '/admin/employeesList',
          name: "Employees List",
          roles: [ROLES.ADMIN],
        }
      ]
    }
  ];
  currentUrl = null;
  currentModule = '';
  currentUserRoles = [];
  fetching = true;
  constructor(
    private router: Router, private route: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Current sidenav URL:', event.url);
      this.currentModule = this.router.url.split('/')[1];
      this.currentUrl = this.router.url;
      this.fetching = false;
    });
    const token = window.sessionStorage.getItem('access_token');
    if (!!token) {
      const decodedToken = jwtDecode(token);
      this.currentUserRoles = decodedToken['user']['roles'];
    }
    console.log("im onint", this.currentUrl, this.currentModule)
  }
  isModuleAccessible(module) {
    let count = 0;
    if (this.currentUserRoles.length > 0) {
      for (const role of this.currentUserRoles) {
        if (module.roles.includes(role.toLowerCase())) {
          count++;
        }
      }
      if (count > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
