import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable, startWith } from 'rxjs';
import { DialogSignatureData } from 'src/app/shared/models/dialog-signature-data.model';
import { Doc } from 'src/app/shared/models/doc.model';
import { SignatureService } from 'src/app/shared/services/signature.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-signature-dialog',
  templateUrl: './signature-dialog.component.html',
  styleUrls: ['./signature-dialog.component.css']
})
export class SignatureDialogComponent implements OnInit {
  selectedDocument: Doc;
  userId: string;

  documentStateCtrl = new FormControl('');
  documentFilteredStates: Observable<Doc[]>;

  constructor(
    public dialogRef: MatDialogRef<SignatureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSignatureData,
    private signatureService: SignatureService,
    private oidcSecurityService: OidcSecurityService,
    private taskService: TaskService,
    private route: Router,
  ) { 
    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      this.userId = userData.sub;   
    });
  }

  ngOnInit(): void {
    this.documentFilteredStates = this.documentStateCtrl.valueChanges.pipe(
      startWith(''),
      map(doc => (doc ? this._docFilter(doc) : this.data.documents!.slice())),
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSignatureClick() {
    this.data.task.status = "In work";

    await this.signatureService.addSignature(this.selectedDocument.id, this.selectedDocument.version).toPromise();
    let publicKeys = await this.signatureService.getSignatures(this.selectedDocument.id, this.selectedDocument.version).toPromise();

    console.log(publicKeys);

    publicKeys?.forEach(k => {
      if (k.userId == this.userId)
        this.data.performer.publicKey = k.publicKey
    });

    this.data.performer.isCompleted = true;
    this.data.performer.signatureDocumentId = this.selectedDocument.id;

    await this.taskService.updateTask(this.data.task).toPromise();

    this.route.navigate(['/']);
    this.dialogRef.close();
  }

  getDocumentsSelection(doc: Doc, event: any) {
    if (event.isUserInput) {
      this.selectedDocument = doc;
    }
  }

  private _docFilter(value: string): Doc[] {
    const filterValue = value.toLowerCase();

    return this.data.documents!.filter(document => document.name.toLowerCase().includes(filterValue));
  }
}
