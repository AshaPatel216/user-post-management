import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit{

  isHeaderRightMenuExpanded: boolean;
  headerLable: string;
  isUsersPageOpen: boolean;

  constructor(private sharedService: SharedService) {
    this.isHeaderRightMenuExpanded = true;
    this.headerLable = '';

    // set header lable based on opened page.
    this.sharedService.headerLable.subscribe((res) => {
      this.headerLable = res;
    });

  }

  ngOnInit(): void {
  }

  /**
   * Expand/Collapse header right menu in responsive view. (js not working so added this custom code)
   */
  expandCollapseHeaderMenuresponsive(): void {
    this.isHeaderRightMenuExpanded = !this.isHeaderRightMenuExpanded;
    const navbar = document.getElementsByTagName('nav')[0];
    // Add bg-white when menu is open
    if (!this.isHeaderRightMenuExpanded) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }
}
