import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskPageComponent } from './task-page/task-page.component';
import { TaskComponent } from './task/task.component';
import { TaskFormPageComponent } from './task-form-page/task-form-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    TaskPageComponent,
    TaskComponent,
    TaskFormPageComponent,
    NotFoundPageComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
