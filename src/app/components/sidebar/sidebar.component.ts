import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-default', class: '' },
    { path: '/inventory', title: 'Inventory',  icon: 'ni-box-2 text-default', class: '' },
    { path: '/category', title: 'Category',  icon:'ni-bullet-list-67 text-default', class: '' },
    { path: '/merk', title: 'Merk',  icon:'ni-tag text-default', class: '' },
    { path: '/series', title: 'Series',  icon:'ni-archive-2 text-default', class: '' },
    { path: '/location', title: 'Location',  icon:'ni-pin-3 text-default', class: '' },
    { path: '/processor', title: 'Processor',  icon:'ni-laptop text-default', class: '' },
    { path: '/ram', title: 'Ram',  icon:'ni-credit-card text-default', class: '' },
    { path: '/storage', title: 'Storage',  icon:'ni-money-coins text-default', class: '' },
    { path: '/user-profile', title: 'Profile',  icon:'ni-circle-08 text-default', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
