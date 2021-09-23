import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { SharedModule } from '../../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import { AddPostComponent } from './add-post/add-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';



@NgModule({
  declarations: [
    PostsComponent,
    AddPostComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
