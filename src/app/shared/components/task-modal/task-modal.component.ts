import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { StandaloneComponentModule } from "../../modules/standalone-component.module";
import { PriorityEnum, StatusEnum, TaskData } from "src/app/task/task-table/task-table.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";

@Component({
  selector: "app-task-modal",
  standalone: true,
  imports: [StandaloneComponentModule],
  template: `
    <h2 mat-dialog-title>Create task</h2>
    <mat-dialog-content class="mat-typography">
      <form [formGroup]="form" class="form">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Deadline</mat-label>
          <input matInput formControlName="deadline" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Priority</mat-label>
          <mat-select formControlName="priority">
            <mat-option [value]="PriorityEnum.No">-</mat-option>
            <mat-option [value]="PriorityEnum.Low">Low</mat-option>
            <mat-option [value]="PriorityEnum.Medium">Medium</mat-option>
            <mat-option [value]="PriorityEnum.High">High</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option [value]="StatusEnum.No">-</mat-option>
            <mat-option [value]="StatusEnum.OnTrack">On Track</mat-option>
            <mat-option [value]="StatusEnum.AtRisk">At Risk</mat-option>
            <mat-option [value]="StatusEnum.OffTrack">Off Track</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Executors</mat-label>
          <input matInput formControlName="executors" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-button
        [mat-dialog-close]="true"
        [disabled]="form.invalid"
        (click)="onSubmit()"
        cdkFocusInitial
      >
        Install
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .form {
        display: flex;
        flex-direction: column;
      }

      mat-form-field {
        width: 20rem;
      }
    `,
  ],
})
export class TaskModalComponent implements OnInit {
  private _submit$ = new Subject<TaskData>();
  submit = this._submit$.asObservable();
  readonly PriorityEnum = PriorityEnum;
  readonly StatusEnum = StatusEnum;
  private readonly fb = inject(FormBuilder);
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      deadline: ["", Validators.required],
      priority: [null],
      status: [null],
      executors: [null],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this._submit$.next(this.form.value);
  }
}
