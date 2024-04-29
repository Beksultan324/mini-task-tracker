import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { StandaloneComponentModule } from "./shared/modules/standalone-component.module";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [StandaloneComponentModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {
  title = "mini-task-tracker";
}
