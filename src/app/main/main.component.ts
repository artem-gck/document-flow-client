import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Doc } from '../shared/doc.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  documents: Doc[] = [new Doc('Artem Hatsko', 1, 'It is my first document. It is document for credit of our bank account'), new Doc('Artem Hatsko', 1, 'It is my second document')];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  onEditClick() {
    console.log("Edit task");
  }

  onDeleteClick(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}