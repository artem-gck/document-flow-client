import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskDocument } from '../shared/models/task-document.model';
import { TaskModel } from '../shared/models/task.model';
import { Validation } from '../shared/models/validation.model';
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
  validation: Validation = new Validation();

  constructor(
    private dialogRef: MatDialogRef<DocumentsComponent>, 
    private documentsService: DocumentService, 
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.validation.isValid = true;
    this.validation.text = "";
  }

  async onAddClick() {
    this.validate();

    if (!this.validation.isValid) {
      return;
    }

    let documentId = await this.documentsService.postDocument(this.file).toPromise();
  
    if (this.task) {
      let document = new TaskDocument();
      document.documentId = documentId!;

      this.task.documents.push(document);

      await this.taskService.updateTask(this.task).toPromise();
    }

    window.location.reload();
    this.dialogRef.close();
  }

  onFileAdded(file: File) {
    this.file = file;
  }

  onSelectTask(task: TaskModel) {
    this.task = task;
  }

  private validate() {
    this.validation.isValid = true;
    this.validation.text = "";

    if (!this.file) {
      this.validation.isValid = false;
      this.validation.text = "Insert new file";
    }
  }
}
