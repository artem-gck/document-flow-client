import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Doc } from 'src/app/shared/models/doc.model';
import { Validation } from 'src/app/shared/models/validation.model';
import { DocumentService } from 'src/app/shared/services/document.service';

@Component({
  selector: 'app-update-doc-dialog',
  templateUrl: './update-doc-dialog.component.html',
  styleUrls: ['./update-doc-dialog.component.css']
})
export class UpdateDocDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateDocDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doc,
    private documentService: DocumentService,
    private route: Router
  ) { }

  nameOfFile: string = "Drag and drop file here";
  newFile: File;
  validation: Validation = new Validation();

  ngOnInit(): void {
    this.validation.isValid = true;
    this.validation.text = "";
  }

  fileBrowseHandler(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList != null && fileList.length != 0) {
      this.newFile = fileList.item(0) as File;

      this.nameOfFile = this.newFile.name;
    }
  }

  async onUpdateClick() {
    this.validate();

    if (!this.validation.isValid) {
      return;
    }

    await this.documentService.updateDocument(this.newFile, this.data.id, this.data.creatorId).toPromise();

    this.dialogRef.close();
  }

  private validate() {
    this.validation.isValid = true;
    this.validation.text = "";

    if (!this.newFile) {
      this.validation.isValid = false;
      this.validation.text = "Insert new file";
    }
  }
}
