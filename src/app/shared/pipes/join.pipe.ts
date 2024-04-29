import { Pipe, PipeTransform } from "@angular/core";
import { Executor } from "src/app/task/task-table/task-table.component";

@Pipe({
  name: "join",
  standalone: true,
})
export class JoinPipe implements PipeTransform {
  transform(value: Executor | Executor[]): string {
    if (Array.isArray(value)) {
      return value.map((item) => item.name).join(", ");
    } else if (value) {
      return value?.name;
    } else {
      return "";
    }
  }
}
