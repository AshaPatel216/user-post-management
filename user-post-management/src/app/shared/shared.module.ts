import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    FormsModule,
    NgImageSliderModule
  ],
  exports: [
    FormsModule,
    NgImageSliderModule
  ],
  providers: [  ]
})
export class SharedModule { }
