import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MaterialExampleModule } from '../material.module';
import { AccountsComponent } from './accounts/accounts.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule}  from '@angular/material/core';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsInsertComponent } from './documents/documents-insert/documents-insert.component';
import { InsertTasksComponent } from './documents/insert-tasks/insert-tasks.component';
import { LentOfTasksComponent } from './main/lent-of-tasks/lent-of-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    AccountsComponent,
    MainComponent,
    DocumentsComponent,
    DocumentsInsertComponent,
    InsertTasksComponent,
    LentOfTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
