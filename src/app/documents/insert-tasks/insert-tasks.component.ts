import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-insert-tasks',
  templateUrl: './insert-tasks.component.html',
  styleUrls: ['./insert-tasks.component.css']
})
export class InsertTasksComponent implements OnInit {
  myControl = new FormControl('');
  options: Task[] = [new Task('1', 'name 1', 'header 1', 'position 1', 'department 1'), new Task('2', 'name 1', 'header 2', 'position 2', 'department 2')];
  filteredOptions: Observable<Task[]>;
  selectionValue: Task | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): Task[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.header.toLowerCase().includes(filterValue));
  }

  getSelection(event: string) {
    console.log(event);

    this.selectionValue = this.options.find(task => task.header === event);
  }
}
