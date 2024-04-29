import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task, TaskTableComponent } from "./task-table/task-table.component";
import { StandaloneComponentModule } from "../shared/modules/standalone-component.module";
import { MatDialog } from "@angular/material/dialog";
import { TaskModalComponent } from "../shared/components/task-modal/task-modal.component";
import { Subject, switchMap, takeUntil } from "rxjs";
import { TaskService } from "./task.service";

@Component({
  selector: "app-task",
  standalone: true,
  imports: [StandaloneComponentModule, TaskTableComponent],
  template: `
    <div class="table_wrapper">
      <button mat-raised-button color="primary" class="create_btn" (click)="openDialog()">
        Create Task
      </button>
      <app-task-table [data]="tasks" (onEdit)="openDialog($event)"></app-task-table>
    </div>
  `,
  styles: [
    `
      .table_wrapper {
        display: flex;
        flex-direction: column;
      }
      .create_btn {
        margin-left: auto;
      }
    `,
  ],
})
export class TaskComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly dialog = inject(MatDialog);
  private readonly taskService = inject(TaskService);
  tasks?: Task[];

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => (this.tasks = tasks));
  }

  openDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: { task },
    });

    dialogRef.componentInstance.submit
      .pipe(
        switchMap((task) => {
          const id = task.id;
          return id ? this.taskService.editTask(task) : this.taskService.addTask(task);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.getTasks());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
