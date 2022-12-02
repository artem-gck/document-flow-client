import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';
import { TaskModel } from '../../shared/models/task.model';

@Component({
  selector: 'app-insert-tasks',
  templateUrl: './insert-tasks.component.html',
  styleUrls: ['./insert-tasks.component.css']
})
export class InsertTasksComponent implements OnInit {
  @Output() selectionValue = new EventEmitter<TaskModel>() //: TaskModel | undefined;
  
  myControl = new FormControl('');
  filteredOptions: Observable<TaskModel[]>;
  tasks: TaskModel[] | undefined;

  constructor (private taskService: TaskService, private userService: UserService) { }

  async ngOnInit() {
    this.tasks = await this.taskService.getAllTasksByOwner().toPromise();

    if (this.tasks == undefined)
      this.tasks = [];

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getSelection(task: TaskModel, event: any) {
    this.selectionValue.emit(task);// = task;
  }

  private _filter(value: string): TaskModel[] {
    const filterValue = value.toLowerCase();

    return this.tasks!.filter(option => option.header.toLowerCase().includes(filterValue));
  }
}