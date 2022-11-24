import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { AccountsComponent } from './accounts/accounts.component';
// import { DocumentsComponent } from './documents/documents.component';
import { MainComponent } from './main/main.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AutoLoginAllRoutesGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AutoLoginAllRoutesGuard] },
  // { path: 'documents', component: DocumentsComponent },
  { path: 'accounts', component: AccountsComponent, canActivate: [AutoLoginAllRoutesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
