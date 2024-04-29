import { FormBuilder, Validators } from "@angular/forms";
import { Task } from "src/app/task/task-table/task-table.component";

export function taskFormFactory(fb: FormBuilder, task: Task | null) {
  return fb.group({
    id: [task?.id ?? null],
    name: [task?.name ?? "", Validators.required],
    deadline: [task?.deadline ?? null],
    priority: [task?.priority ?? null],
    status: [task?.status ?? null],
    executors: [task?.executors ?? null],
  });
}
