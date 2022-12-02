import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Doc } from 'src/app/shared/models/doc.model';
import { Performer } from 'src/app/shared/models/performer.model';
import { TaskDocument } from 'src/app/shared/models/task-document.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';
import { DocumentService } from 'src/app/shared/services/document.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() task: TaskModel;
  @Input() docsInput: Doc[];
  @Input() usersInput: Performer[];

  selectionOfTypes = [
    { value: 0, label: "Successively" }, 
    { value: 1, label: "Parallel" }
  ];

  documentStateCtrl = new FormControl('');
  documentFilteredStates: Observable<Doc[]>;
  documents: Doc[] | undefined = [ ];

  userStateCtrl = new FormControl<string | User>('');
  userFilteredStates: Observable<User[]>;
  users: User[] | undefined = [ ];

  constructor(private documentService: DocumentService, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.task.typeNumber = 0;
    this.users = await this.userService.getAllUsers().toPromise();
    this.documents = await this.documentService.getDocsNames().toPromise();

    this.userFilteredStates = this.userStateCtrl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._userFilter(name as string) : this.users!.slice();
      }),
    );

    this.documentFilteredStates = this.documentStateCtrl.valueChanges.pipe(
      startWith(''),
      map(doc => (doc ? this._docFilter(doc) : this.documents!.slice())),
    );
  }

  async getDocumentsSelection(doc: Doc, event: any) {
    if (event.isUserInput) {
      let user = await this.userService.getUser(doc.creatorId).toPromise();
      doc.creator = user?.surname + " " + user?.name;

      this.docsInput.push(doc);

      let document = new TaskDocument();
      document.documentId = doc.id;

      this.task.documents.push(document);
    }
  }

  getUsersSelection(user: User, event: any) {
    if (event.isUserInput) {
      let performer = new Performer();
      performer.userId = user.id;
      performer.userName = user.surname + " " + user.name + " " + user.patronymic;

      this.usersInput.push(performer);
      this.task.performers.push(performer);
    }
  }

  private _docFilter(value: string): Doc[] {
    const filterValue = value.toLowerCase();

    return this.documents!.filter(document => document.name.toLowerCase().includes(filterValue));
  }

  private _userFilter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.users!.filter(user => user.name.toLowerCase().includes(filterValue));
  }
}
