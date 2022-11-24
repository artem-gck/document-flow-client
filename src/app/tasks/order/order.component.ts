import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  tasks: Task[] = [
    new Task("1 id", "1 name", "1 header", "1 position", "1 department"),
    new Task("2 id", "2 name", "2 header", "2 position", "2 department"),
    // new Task("3 id", "3 name", "3 header", "3 position", "3 department"),
    // new Task("4 id", "4 name", "4 header", "4 position", "4 department"),
    // new Task("5 id", "5 name", "5 header", "5 position", "5 department"),
    // new Task("6 id", "6 name", "6 header", "6 position", "6 department"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onCross(task: Task) {
    let index = this.tasks.indexOf(task);

    if (index > -1)
    this.tasks.splice(index, 1);
  }
}
