import { Component, OnInit } from '@angular/core';
import { Doc } from '../shared/doc.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  documents: Doc[] = [new Doc('Artem Hatsko', 1, 'It is my first document. It is document for credit of our bank account'), new Doc('Artem Hatsko', 1, 'It is my second document')];

  constructor() { }

  ngOnInit(): void {
  }

  onClear() {
    console.log("Clear task");
  }

  onCreate() {
    console.log("Create task");
  }
}
