import { Component, OnDestroy, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskTableComponent } from "./task-table/task-table.component";
import { StandaloneComponentModule } from "../shared/modules/standalone-component.module";
import { MatDialog } from "@angular/material/dialog";
import { TaskModalComponent } from "../shared/components/task-modal/task-modal.component";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-task",
  standalone: true,
  imports: [StandaloneComponentModule, TaskTableComponent],
  template: `
    <div class="table_wrapper">
      <button mat-raised-button color="primary" class="create_btn" (click)="openDialog()">
        Open dialog
      </button>
      <app-task-table></app-task-table>
    </div>
  `,
  styles: [
    `
      .table_wrapper {
        display: flex;
        flex-direction: column;
        padding: 1rem 3rem;
      }
      .create_btn {
        margin-left: auto;
      }
    `,
  ],
})
export class TaskComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: {
        animal: "panda",
      },
    });

    dialogRef.componentInstance.submit.pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        console.log(result);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
