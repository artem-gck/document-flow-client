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
import { DocumentComponent } from './shared/document/document.component';
import { HorizontalScrollDirective } from './shared/directives/horizontal-scroll.directive';
import { TableOfTasksComponent } from './main/table-of-tasks/table-of-tasks.component';
import { TableComponent } from './main/table-of-tasks/table/table.component';
import { DescriptionComponent } from './main/description/description.component';
import { DialogComponent } from './main/dialog/dialog.component';
import { OrderComponent } from './tasks/order/order.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    AccountsComponent,
    MainComponent,
    DocumentsComponent,
    DocumentsInsertComponent,
    InsertTasksComponent,
    DocumentComponent,
    HorizontalScrollDirective,
    TableOfTasksComponent,
    TableComponent,
    TasksComponent,
    DescriptionComponent,
    DialogComponent,
    OrderComponent
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
  exports: [
    DocumentsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
