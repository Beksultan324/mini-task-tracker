import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { StandaloneComponentModule } from "src/app/shared/modules/standalone-component.module";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

export interface TaskData {
  id?: string;
  name: string;
  deadline: string;
  priority: PriorityEnum;
  status: StatusEnum;
  executors: string;
}

export enum PriorityEnum {
  No = "-",
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
}

export enum StatusEnum {
  No = "-",
  OnTrack = "ON_TRACK",
  AtRisk = "AT_RISK",
  OffTrack = "OFF_TRACK",
}

const TASK: TaskData[] = [
  {
    id: "1",
    name: "Home Work",
    deadline: "06/11/2022",
    priority: PriorityEnum.High,
    status: StatusEnum.No,
    executors: "Tom",
  },
];

@Component({
  selector: "app-task-table",
  standalone: true,
  imports: [StandaloneComponentModule],
  templateUrl: "./task-table.component.html",
  styles: [],
})
export class TaskTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["name", "deadline", "priority", "status", "executors"];
  dataSource: MatTableDataSource<TaskData>;

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor() {
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
    this.dataSource = new MatTableDataSource(TASK);
  }

  ngOnInit(): void {
  }

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
}
