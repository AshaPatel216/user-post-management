import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';



@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserAddEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
