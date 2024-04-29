import { Routes } from "@angular/router";
import { TaskComponent } from "./task/task.component";
import { DetailViewComponent } from "./task/detail-view/detail-view.component";

export const routes: Routes = [
  {
    path: "",
    component: TaskComponent,
  },
  {
    path: "detail-view",
    component: DetailViewComponent,
  },
];
