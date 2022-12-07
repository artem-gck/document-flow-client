import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Doc } from '../shared/models/doc.model';
import { Performer } from '../shared/models/performer.model';
import { TaskModel } from '../shared/models/task.model';
import { DocumentService } from '../shared/services/document.service';
import { SplashOnOffService } from '../shared/services/splash-on-off.service';
import { TaskService } from '../shared/services/task.service';
import { SignatureDialogComponent } from './signature-dialog/signature-dialog.component';
import { UpdateDocDialogComponent } from './update-doc-dialog/update-doc-dialog.component';

@Component({
  selector: 'app-tasks-execute',
  templateUrl: './tasks-execute.component.html',
  styleUrls: ['./tasks-execute.component.css']
})
export class TasksExecuteComponent implements OnInit, AfterViewInit {
  task: TaskModel | undefined = new TaskModel();
  performer: Performer = new Performer();
  documents: Doc[] = [];
  userId: string;

  constructor(
    private route: Router,
    private routeParam: ActivatedRoute,
    private taskService: TaskService,
    private documentsService: DocumentService,
    private oidcSecurityService: OidcSecurityService,
    private dialog: MatDialog,
    private splashOnOffService: SplashOnOffService ) { }

  async ngOnInit(): Promise<void> {
    this.splashOnOffService.switchOnOff(true); 

    let id = this.routeParam.snapshot.paramMap.get('id');
    let userId: string;

    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      userId = userData.sub;   
    });

    try {
      let isTask = false;

      this.task = await this.taskService.getTask(id!).toPromise();

      this.task!.performers.forEach(p => {
        if (p.userId === userId)
          isTask = true;
      });

      if (!isTask)
        throw "";
    } 
    catch (error) {
      this.route.navigate(['/error']);
      return;
    }

    for (let i = 0; i < this.task!.documents.length; i++) {
      let document = await this.documentsService.getDocsNameById(this.task!.documents[i].documentId).toPromise();
      this.documents.push(document!);
    }
    
    this.performer = this.task!.performers.filter(p => p.userId == userId)[0];
  }

  ngAfterViewInit() {
    this.splashOnOffService.switchOnOff(false);
  }

  onCancel() {
    this.route.navigate(['/']);
  }

  async onRefine() {
    this.task!.status = "To refine"

    await this.taskService.updateTask(this.task!).toPromise();

    this.route.navigate(['/']);
  }

  onSignature() {
    this.dialog.open(SignatureDialogComponent, {
      width: '600px',
      data: { task: this.task, performer: this.performer, documents: this.documents },
    });
  }

  async onReconciliation() {
    this.performer.isCompleted = true;
    this.task!.status = "In work";

    await this.taskService.updateTask(this.task!).toPromise();
    
    this.route.navigate(['/']);
  }

  onUpdateDocument(document: Doc) {
    let dialog = this.dialog.open(UpdateDocDialogComponent, {
      width: '500px',
      data: document,
    });

    dialog.afterClosed().subscribe(a => {
      window.location.reload();
    })
  }
}
