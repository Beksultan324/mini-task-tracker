import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from "@angular/core";
import { StandaloneComponentModule } from "src/app/shared/modules/standalone-component.module";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { StopPropagationDirective } from "src/app/shared/directives/stop-propagation.directive";
import { JoinPipe } from "src/app/shared/pipes/join.pipe";

export interface Task {
  id?: string;
  name: string;
  deadline: string;
  priority: PriorityEnum;
  status: StatusEnum;
  executors: Executor[];
}

export interface Executor {
  id: string;
  name: string;
}

export enum PriorityEnum {
  No = "-",
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum StatusEnum {
  No = "-",
  OnTrack = "On Track",
  AtRisk = "At Risk",
  OffTrack = "Off Track",
}

@Component({
  selector: "app-task-table",
  standalone: true,
  imports: [StandaloneComponentModule, StopPropagationDirective, JoinPipe],
  templateUrl: "./task-table.component.html",
  styles: [],
})
export class TaskTableComponent implements AfterViewInit {
  readonly displayedColumns: string[] = [
    "name",
    "deadline",
    "priority",
    "status",
    "executors",
    "actions",
  ];
  readonly dataSource = new MatTableDataSource<Task>();
  private readonly router = inject(Router);
  @Output() onEdit = new EventEmitter<Task>();

  @Input() set data(value: Task[] | undefined) {
    if (value) {
      this.dataSource.data = value;
    }
  }

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetailedView(task: Task) {
    this.router.navigate(["detail-view"], { queryParams: task });
  }
}
