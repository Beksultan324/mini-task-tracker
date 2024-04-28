import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class StandaloneComponentModule { }
