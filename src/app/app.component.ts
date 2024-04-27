import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskModalComponent } from './shared/components/task-modal/task-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskModalComponent],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {
  title = 'mini-task-tracker';
}
