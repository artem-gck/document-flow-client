import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { AccountsComponent } from './accounts/accounts.component';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { TasksEditComponent } from './tasks-edit/tasks-edit.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AutoLoginAllRoutesGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AutoLoginAllRoutesGuard] },
  { path: 'tasks/:id', component: TasksEditComponent, canActivate: [AutoLoginAllRoutesGuard] },
  { path: 'regisration', component: RegistrationComponent, canActivate: [AutoLoginAllRoutesGuard] },
  { path: 'accounts', component: AccountsComponent, canActivate: [AutoLoginAllRoutesGuard] },
  { path: '**', component: ErrorComponent, canActivate: [AutoLoginAllRoutesGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }