import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { UsersService } from './users.service';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserAddEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
