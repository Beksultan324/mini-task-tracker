import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { StandaloneComponentModule } from "src/app/shared/modules/standalone-component.module";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { Task } from "../task-table/task-table.component";
import { JoinPipe } from "src/app/shared/pipes/join.pipe";

@Component({
  selector: "app-detail-view",
  standalone: true,
  imports: [StandaloneComponentModule, JoinPipe],
  template: `<h2>Task Detail View</h2>
    <div class="content-wrapper">
      <div><span>Name:</span> {{ task.name }}</div>
      <div><span>Executors:</span> {{ task.executors | join }}</div>
      <div><span>Priority:</span> {{ task.priority }}</div>
      <div><span>Status:</span> {{ task.status }}</div>
      <div><span>Deadline:</span> {{ task.deadline | date }}</div>
    </div>`,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    `,
  ],
})
export class DetailViewComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly route = inject(ActivatedRoute);
  task!: Task;

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((task) => (this.task = task as Task));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
