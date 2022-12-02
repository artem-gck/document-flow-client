import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Performer } from 'src/app/shared/models/performer.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() user: Performer;
  @Input() task: TaskModel;

  @Output() crossUser = new EventEmitter<Performer>();

  typesOfExecuting = [ "Signature", "Reconciliation" ];

  constructor() { }

  ngOnInit(): void {
    if (this.user.typeOfTask == undefined)
      this.user.typeOfTask = "Signature";
  }

  onCross(user: Performer) {
    this.crossUser.emit(user);
  }
}
