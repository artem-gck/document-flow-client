import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-of-tasks',
  templateUrl: './table-of-tasks.component.html',
  styleUrls: ['./table-of-tasks.component.css']
})
export class TableOfTasksComponent implements OnInit {
  selectableOptions = [{type: "Input", selector: 0}, {type: "Output", selector: 1}]
  tabs: string[] = ['For work', 'In work', 'Completed']
  selectedTypeOfTasks: number = 0;
  selectedTab: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
}
