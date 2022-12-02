import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskDocument } from '../shared/models/task-document.model';
import { TaskModel } from '../shared/models/task.model';
import { DocumentService } from '../shared/services/document.service';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  theam: string = '';
  file: File;
  task: TaskModel;

  constructor(public dialogRef: MatDialogRef<DocumentsComponent>, private documentsService: DocumentService, private taskService: TaskService) { }

  ngOnInit(): void {
  }

  async onAddClick() {
    let documentId = await this.documentsService.postDocument(this.file).toPromise();
  
    if (this.task) {
      let document = new TaskDocument();
      document.documentId = documentId!;

      this.task.documents.push(document);

      await this.taskService.updateTask(this.task).toPromise();
    }

    window.location.reload();
  }

  onFileAdded(file: File) {
    this.file = file;
  }

  onSelectTask(task: TaskModel) {
    this.task = task;
  }
}
