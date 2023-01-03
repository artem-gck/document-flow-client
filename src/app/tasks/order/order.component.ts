import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Performer } from 'src/app/shared/models/performer.model';
import { PublicKey } from 'src/app/shared/models/public-key.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { SignatureService } from 'src/app/shared/services/signature.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() user: Performer;
  @Input() task: TaskModel;
  isValid: string = "Not checked";

  @Output() crossUser = new EventEmitter<Performer>();

  typesOfExecuting = [ "Signature", "Reconciliation" ];

  constructor(
    private signatureService: SignatureService
  ) { }

  ngOnInit(): void {
    if (this.user.typeOfTask == undefined)
      this.user.typeOfTask = "Signature";
  }

  onCross(user: Performer) {
    this.crossUser.emit(user);
  }

  async onCheckSignature() {
    let key = new PublicKey();
    key.key = this.user.publicKey;

    let result = await this.signatureService.checkSignature(key, this.user.signatureDocumentId, 0).toPromise();

    if (result?.status == 404)
      this.isValid = "Not valid"
    else
      this.isValid = "Valid";
  }
}
