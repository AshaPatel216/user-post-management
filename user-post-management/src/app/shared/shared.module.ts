import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared.service';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [ 
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    //SharedService
  ]
})
export class SharedModule { }
