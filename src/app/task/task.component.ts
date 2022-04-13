import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;

  @Output() readonly edit = new EventEmitter<Task>();
}