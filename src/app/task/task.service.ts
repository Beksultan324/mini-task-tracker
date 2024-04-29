import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "./task-table/task-table.component";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private url = "http://localhost:3000/tasks";

  constructor(private readonly http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  addTask(task: Task): Observable<void> {
    return this.http.post<void>(this.url, task);
  }

  editTask(task: Task): Observable<void> {
    const putUrl = `${this.url}/${task.id}`;
    return this.http.put<void>(putUrl, task);
  }
}
