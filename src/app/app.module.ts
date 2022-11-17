import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogAnimationsExampleDialog, SideMenuComponent } from './side-menu/side-menu.component';
import { MaterialExampleModule } from '../material.module';
import { AccountsComponent } from './accounts/accounts.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule}  from '@angular/material/core';

@NgModule({
  declarations: [
    DialogAnimationsExampleDialog,
    AppComponent,
    SideMenuComponent,
    AccountsComponent,
    MainComponent
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
