import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { TaskFormPageComponent } from './task-form-page/task-form-page.component';
import { TaskPageComponent } from './task-page/task-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'tasks', pathMatch: 'full', redirectTo: 'task/list' },
  { path: 'task/list', component: TaskPageComponent },
  { path: 'task/form', component: TaskFormPageComponent },
  { path: 'task/form/:sn', component: TaskFormPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
