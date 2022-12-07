import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validation } from '../shared/models/validation.model';

@Component({
  selector: 'app-validate-dialog',
  templateUrl: './validate-dialog.component.html',
  styleUrls: ['./validate-dialog.component.css']
})
export class ValidateDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ValidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Validation,
  ) { }

  ngOnInit(): void {
  }

}
