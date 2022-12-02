import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskModel } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-table-of-tasks',
  templateUrl: './table-of-tasks.component.html',
  styleUrls: ['./table-of-tasks.component.css']
})
export class TableOfTasksComponent implements OnInit {
  @Output() selectedType = new EventEmitter<number>();
  @Output() selectedTask = new EventEmitter<TaskModel>();

  selectableOptions = [{type: "Input", selector: 0}, {type: "Output", selector: 1}]
  selectedTypeOfTasks: number = 0;
  selectedTab: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectTask(task: TaskModel) {
    this.selectedTask.emit(task);
  }

  onChangeSelect(type: any, event: any) {
    this.selectedType.emit(type.selector);
  }
}
