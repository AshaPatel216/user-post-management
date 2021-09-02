import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  //{ path: '**', redirectTo: 'account', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
