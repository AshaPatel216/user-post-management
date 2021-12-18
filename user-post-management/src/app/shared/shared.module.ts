import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared.service';
import { LoaderComponent } from './loader/loader.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [ 
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgImageSliderModule
  ],
  exports: [
    LoaderComponent,
    FormsModule,
    NgImageSliderModule
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule { }
