import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  {
    path: '', component: PostsComponent,
    children: [
      { path: 'add', component: AddPostComponent },
      { path: ':postId', component: PostDetailsComponent },
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
