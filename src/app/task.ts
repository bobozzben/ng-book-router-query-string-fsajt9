export class Task {
  constructor(initData?: Partial<Task>) {
    Object.assign(this, initData);
  }

  TaskSn!: string;
  TaskName!: string;
}
