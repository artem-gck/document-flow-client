import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MainComponent } from './main/main.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'accounts', component: AccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
