import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap, skip, take, toArray } from 'rxjs/operators';

import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  get(taskSn: string): Observable<Task> {
    return this.httpClient
      .get<Task[]>('assets/tasks.json')
      .pipe(map((tasks) => tasks.find((task) => task.TaskSn === taskSn)));
  }

  getList(pageIndex = 0, pageSize = 12): Observable<Task[]> {
    return this.httpClient.get<Task[]>('assets/tasks.json').pipe(
      mergeMap((task) => task),
      skip(pageIndex * pageSize),
      take(pageSize),
      toArray()
    );
  }
}
