import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, throwError } from 'rxjs';
import { Doc } from '../shared/models/doc.model';
import { Performer } from '../shared/models/performer.model';
import { TaskModel } from '../shared/models/task.model';
import { User } from '../shared/models/user.model';
import { DocumentService } from '../shared/services/document.service';
import { TaskService } from '../shared/services/task.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.css']
})
export class TasksEditComponent implements OnInit {
  task: TaskModel | undefined = new TaskModel();
  documents: Doc[] = [];
  users: Performer[] = [];

  constructor(
    private route: Router, 
    private routeParam: ActivatedRoute, 
    private taskService: TaskService,
    private documentsService: DocumentService,
    private userService: UserService,
    private oidcSecurityService: OidcSecurityService) { }

  async ngOnInit(): Promise<void> {
    let id = this.routeParam.snapshot.paramMap.get('id');
    let userId: string;

    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      userId = userData.sub;   
    });

    try {
      this.task = await this.taskService.getTask(id!).toPromise();

      console.log(this.task);

      if (this.task!.ownerUserId !== userId!)
        throw "";
    } 
    catch (error) {
      this.route.navigate(['/error']);
      return;
    }

    this.task!.typeNumber = this.task!.type === "Successively" ? 0 : 1;

    var documentsId = this.task!.documents;
    var usersId = this.task!.performers;

    for (let i = 0; i < documentsId.length; i++) {
      let doc = await this.documentsService.getDocsNameById(documentsId[i].documentId).toPromise();
      let us = await this.userService.getUser(doc?.creatorId!).toPromise();

      doc!.creator = us!.surname! + " " + us!.name!;

      this.documents.push(doc!);
    }

    for (let i = 0; i < usersId.length; i++) {
      let us = await this.userService.getUser(usersId[i].userId).toPromise();
      usersId[i].userName = us?.surname + " " + us?.name + " " + us?.patronymic;

      this.users.push(usersId[i]);
    }
  }

  onClear() {
    this.task = new TaskModel();
    this.task.performers = [];
    this.task.documents = [];
    this.task.typeNumber = 0;

    this.documents = [];
    this.users = [];
  }

  async onCreate() {
    let usersArgs = this.task!.performers;

    if (this.task!.typeNumber == 0)
      this.task!.type = "successively";
    else
      this.task!.type = "parallel";

    await this.taskService.updateTask(this.task!).toPromise(); 

    this.route.navigate(['/']);
  }

  onDeleteDoc(document: Doc) {
    let index = this.documents.indexOf(document);
    
    let arg = this.task!.documents.filter(doc => doc.documentId === document.id).at(0);
    let i = this.task!.documents.indexOf(arg!);

    if (i > -1)
      this.task!.documents.splice(i, 1);

    if (index > -1)
      this.documents.splice(index, 1);
  }

  async onDeleteTask() {
    await this.taskService.deleteTask(this.task!.id).toPromise();
    this.route.navigate(['/']);
  }

  onCross(user: Performer) {
    let index = this.users.indexOf(user);

    let arg = this.task!.performers.filter(us => us.userId === user.userId && us.description === user.description && us.typeOfTask === user.typeOfTask).at(0);
    let i = this.task!.performers.indexOf(arg!);

    if (i > -1)
      this.task!.performers.splice(i, 1);

    if (index > -1)
      this.users.splice(index, 1);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(
      'Something bad happened; please try again later.');
  }
}
