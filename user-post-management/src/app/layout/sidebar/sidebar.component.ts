import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostsService } from '../posts/posts.service';
import { SidebarMenuItem } from './sidebar-menu-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, AfterContentChecked{

  sidebarMenuItems: SidebarMenuItem[];
  selectedSidebarMenuLink: string;

  constructor(private router: Router,
    private postService: PostsService) {
    this.selectedSidebarMenuLink = '';
    this.sidebarMenuItems = [];
    this.setSidebarMenuItems();
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.setActiveLink();
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
    this.sidebarMenuItems.forEach(item => {
      this.selectedSidebarMenuLink = item.path;
      // Make sidebar link active if route matches
      if (this.router.url.includes(this.selectedSidebarMenuLink)) {
        item.isActive = true;
      }
      else {
        item.isActive = false;
      }
    })
  }

  /**
   * Reset my post variable to false
   */
  resetVariables(): void {
    this.postService.isMyPostsVisible.next(false);
  }
}
