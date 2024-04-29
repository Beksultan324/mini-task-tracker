import { Component, EventEmitter, Inject, OnInit, Output, inject } from "@angular/core";
import { StandaloneComponentModule } from "../../modules/standalone-component.module";
import { PriorityEnum, StatusEnum, Task } from "src/app/task/task-table/task-table.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { taskFormFactory } from "./task-form";

const USERS = [
  { id: 1, name: "Tom" },
  { id: 2, name: "Loky" },
];

@Component({
  selector: "app-task-modal",
  standalone: true,
  imports: [StandaloneComponentModule],
  templateUrl: "./task-modal.component.html",
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
  private _submit$ = new Subject<Task>();
  public submit = this._submit$.asObservable();
  readonly PriorityEnum = PriorityEnum;
  readonly StatusEnum = StatusEnum;
  readonly executors = USERS;
  form: FormGroup;

  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data?: { task: Task }) {
    const task = data?.task;
    this.form = taskFormFactory(fb, task ?? null);
  }

  ngOnInit(): void {}

  onSubmit() {
    this._submit$.next(this.form.value);
  }
}
