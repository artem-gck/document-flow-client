import { Component, OnInit } from '@angular/core';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { Doc } from '../shared/models/doc.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  documents: Doc[] = [
    new Doc('1', 'Artem Hatsko', 1, 'It is my 1 document'), 
    new Doc('2', 'Artem Hatsko', 1, 'It is my 2 document'),
    // new Doc('Artem Hatsko', 1, 'It is my 3 document'),
    // new Doc('Artem Hatsko', 1, 'It is my 4 document'),
    // new Doc('Artem Hatsko', 1, 'It is my 5 document'),
    // new Doc('Artem Hatsko', 1, 'It is my 6 document'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onClear() {
    console.log("Clear task");
  }

  onCreate() {
    console.log("Create task");
  }

  onDeleteDoc(document: Doc) {
    let index = this.documents.indexOf(document);
    
    if (index > -1)
    this.documents.splice(index, 1);
  }
}
