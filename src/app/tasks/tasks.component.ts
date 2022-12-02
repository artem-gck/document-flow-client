import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doc } from '../shared/models/doc.model';
import { TaskModel } from '../shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TaskService } from '../shared/services/task.service';
import { Performer } from '../shared/models/performer.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  task: TaskModel = new TaskModel();
  documents: Doc[] = [];
  users: Performer[] = [];

  constructor(
    private route: Router, 
    private oidcSecurityService: OidcSecurityService, 
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.task.performers = [];
    this.task.documents = [];
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
    let usersArgs = this.task.performers;

    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      this.task.ownerUserId = userData.sub;   
    });

    if (this.task.typeNumber == 0)
      this.task.type = "successively";
    else
      this.task.type = "parallel";

    console.log(this.task);

    await this.taskService.addTask(this.task).toPromise(); 

    this.route.navigate(['/']);
  }

  onDeleteDoc(document: Doc) {
    let index = this.documents.indexOf(document);
    
    let arg = this.task.documents.filter(doc => doc.documentId === document.id).at(0);
    let i = this.task.documents.indexOf(arg!);

    if (i > -1)
      this.task.documents.splice(i, 1);

    if (index > -1)
      this.documents.splice(index, 1);
  }

  onCross(user: Performer) {
    let index = this.users.indexOf(user);

    let arg = this.task.performers.filter(us => us.userId === user.userId && us.description === user.description && us.typeOfTask === user.typeOfTask).at(0);
    let i = this.task.performers.indexOf(arg!);

    if (i > -1)
      this.task.performers.splice(i, 1);

    if (index > -1)
      this.users.splice(index, 1);
  }
}
