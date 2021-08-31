import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {

  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.sharedService.headerLable.next('users');
  }

  ngOnDestroy(): void {
    this.sharedService.headerLable.next('');
  }
}
