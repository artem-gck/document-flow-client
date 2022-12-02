import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Doc } from '../shared/models/doc.model';
import { DocumentService } from '../shared/services/document.service';
import { UserService } from '../shared/services/user.service';
import { TaskModel } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  documents: Doc[] = [];
  selectedTask: TaskModel | undefined;
  selectedTypeOfTasks: number = 0;

  isExecute: boolean = false;
  isEdit: boolean = false;
  isDelete: boolean = false;

  constructor(
    private route: Router,
    private dialog: MatDialog, 
    private documentsService: DocumentService, 
    private userService: UserService,
    private oidcSecurityService: OidcSecurityService
    ) { }

  async ngOnInit(): Promise<void> {
    this.documents = (await this.documentsService.getLastDocsNames(4).toPromise())!;

    for (let i = 0; i < this.documents!.length; i++) {
      this.userService.getUser(this.documents!.at(i)!.creatorId as string).subscribe(user => {
          this.documents!.at(i)!.creator = user.surname + " " + user.name;
      })
    }
  }

  onEditClick() {
    this.route.navigate([`/tasks/${this.selectedTask!.id}`]);
  }

  onDeleteClick(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        taskId: this.selectedTask!.id
      }
    });
  }

  onDeleteDoc(document: Doc) {
    let index = this.documents.indexOf(document);
    
    if (index > -1)
    this.documents.splice(index, 1);
  }

  onSelectTask(task: TaskModel) {
    this.selectedTask = task;

    let userId: string;

    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      userId = userData.sub;   
    });

    if (this.selectedTask.ownerUserId == userId!) {
      this.isDelete = true;
      this.isEdit = true; 
    }
    else {
      this.isDelete = false;
      this.isEdit = false; 
    }

    this.isExecute = false;

    if (this.selectedTask.status !== "Completed")
      this.selectedTask.performers.every(arg => {
        if (arg.userId == userId!)
        {
          this.isExecute = true;
          return false;
        }

        return true;
      })
  }

  onExecClick() { }

  onSelectChange(select: number) {
    this.selectedTask = undefined;
    this.isDelete = false;
    this.isEdit = false;
    this.isExecute = false;
  }
}