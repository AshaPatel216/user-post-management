import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';

const routes: Routes = [

  {
    path: '', component: UsersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: UsersListComponent },
      { path: 'add', component: UserAddEditComponent },
      { path: 'edit/:id', component: UserAddEditComponent }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
