import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.css'],
})
export class TaskFormPageComponent implements OnInit, OnDestroy {
  task: Task;

  readonly formControl = new FormControl();

  private readonly stop$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('sn')),
        switchMap((taskSn) => this.taskService.get(taskSn)),
        tap((task) => (this.task = task)),
        takeUntil(this.stop$)
      )
      .subscribe((task) => this.formControl.setValue(task.TaskName));
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  onCancel(): void {
    this.router.navigate(['task', 'list'], {
      queryParamsHandling: 'preserve',
    });
  }
}
