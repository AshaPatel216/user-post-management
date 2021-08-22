import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SidebarMenuItem } from './sidebar-menu-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  sidebarMenuItems: SidebarMenuItem[];
  selectedSidebarMenuLink: string;

  constructor(private router: Router) {
    this.selectedSidebarMenuLink = '';
    this.sidebarMenuItems = [];
    this.setSidebarMenuItems();
    this.setActiveLink();
  }

  ngOnInit(): void {
  }

  /**
   * Set sidebar menu list
   */
  setSidebarMenuItems(): void {
    this.sidebarMenuItems = [
      { name: 'Users', icon: 'users_single-02', path: 'user', isActive: false },
      { name: 'Posts', icon: 'education_paper', path: 'post', isActive: false }
    ];
  }

  /**
   * Set sidebar link active
   */
  setActiveLink(): void {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.sidebarMenuItems.forEach(item => {
            this.selectedSidebarMenuLink = item.path!;
            // Make sidebar link active if route matches
            if (event.urlAfterRedirects.includes(this.selectedSidebarMenuLink)) {
              item.isActive = true;
            }
            else {
              item.isActive = false;
            }
          })
        }
      })
  }
}
