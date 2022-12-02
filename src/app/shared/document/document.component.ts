import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { windowWhen } from 'rxjs';
import { Doc } from '../models/doc.model';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  @Input() document: Doc;
  @Output() delete = new EventEmitter<Doc>();

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.delete.emit(this.document);
  }

  onFileDownload() {
      this.documentService.getDocument(this.document.id, this.document.version).subscribe(responce => {
        let fileName = responce.headers.get("content-disposition")?.split(';')[1].split('=')[1].replace(/"/g, "");
        console.log(fileName);
        let blob: Blob = responce.body as Blob;

        let a = document.createElement('a');
        a.download = fileName!;
        a.href = window.URL.createObjectURL(blob);
        a.click();
    });
  }
}
