import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doc } from '../models/doc.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  @Input() document: Doc;
  @Output() delete = new EventEmitter<Doc>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.delete.emit(this.document);
  }
}
