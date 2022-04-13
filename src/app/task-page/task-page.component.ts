import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
})
export class TaskPageComponent implements OnInit {
  tasks$!: Observable<Task[]>;

  pageIndex!: number;
  pageSize!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  // 書本勘誤 p.9-12
  // 錯誤內容：路由參數的訂閱需要手動去取消，否則會在每次頁面元件載入時都會建立一個訂閱。
  // 正確內容：當元件裡有注入 ActivatedRoute，在 Router 建立元件時會一併建立 ActivatedRoute 實體，
  //         而此元件被銷毀的同時，被注入至元件的 ActivatedRoute 實體也會一併被銷毀，因此不需要手動取消訂閱
  ngOnInit(): void {
    // const pageIndex = +this.route.snapshot.queryParamMap.get('pageIdx') || 1;
    // const pageSize = +this.route.snapshot.queryParamMap.get('pageSize') || 5;
    // this.tasks$ = this.taskService.getList(pageIndex, pageSize);

    this.tasks$ = this.route.queryParamMap.pipe(
      map((queryParamMap) => ({
        index: +queryParamMap.get('pageIdx') ?? 0,
        size: +queryParamMap.get('pageSize') || 5,
      })),
      tap(({ index, size }) => {
        this.pageIndex = index;
        this.pageSize = size;
      }),
      switchMap(({ index, size }) => this.taskService.getList(index, size))
    );
  }

  onAdd(): void {
    this.router.navigate(['task', 'form']);
  }

  onEdit(task: Task): void {
    this.router.navigate(['task', 'form', task.TaskSn], {
      queryParamsHandling: 'preserve',
    });
  }

  onNextPage(moveIndex: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        pageIdx: this.pageIndex + moveIndex,
        //pageSize: this.pageSize,
      },
    });
  }
}
