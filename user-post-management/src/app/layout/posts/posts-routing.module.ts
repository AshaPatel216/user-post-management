import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsComponent } from './posts.component';
const routes: Routes = [

  {
    path: '', component: PostsComponent,
    children: [
      { path: '', redirectTo: '1', pathMatch: 'full' },
      { path: '1', component: PostDetailsComponent },
      { path: 'add', component: AddPostComponent }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
