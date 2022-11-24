import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { DocumentsComponent } from '../documents/documents.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(public dialog: MatDialog, private oidcSecurityService: OidcSecurityService) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DocumentsComponent, {
      width: '713px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
}