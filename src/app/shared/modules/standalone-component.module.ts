import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  exports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
})
export class StandaloneComponentModule {}
