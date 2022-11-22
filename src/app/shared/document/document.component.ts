import { Component, Input, OnInit } from '@angular/core';
import { Doc } from '../doc.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  @Input() document: Doc;

  constructor() { }

  ngOnInit(): void {
  }

}
