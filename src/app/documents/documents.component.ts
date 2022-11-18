import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  theam: string = '';

  constructor(public dialogRef: MatDialogRef<DocumentsComponent>) { }

  ngOnInit(): void {
  }

  onAddClick() {
    
  }
}
