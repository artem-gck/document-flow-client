import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-documents-insert',
  templateUrl: './documents-insert.component.html',
  styleUrls: ['./documents-insert.component.css']
})
export class DocumentsInsertComponent implements OnInit {
  nameOfFile: string = 'Drag and drop file here';
  @Output() fileAdded = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  fileBrowseHandler(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList != null && fileList.length != 0) {
      let file = fileList.item(0) as File;

      this.fileAdded.emit(file);

      this.nameOfFile = file.name;
    }
  }
}
