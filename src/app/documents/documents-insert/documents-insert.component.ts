import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents-insert',
  templateUrl: './documents-insert.component.html',
  styleUrls: ['./documents-insert.component.css']
})
export class DocumentsInsertComponent implements OnInit {
  nameOfFile: string = 'Drag and drop file here';

  constructor() { }

  ngOnInit(): void {
  }

  fileBrowseHandler(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList != null && fileList.length != 0) {
      let file = fileList.item(0) as File;
      this.nameOfFile = file.name;
    }
  }
}
