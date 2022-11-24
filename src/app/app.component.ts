import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Docs&Go';

  userAuthenticated = false;
  user: any;

  // constructor(private _authService: AuthService){
  //   this._authService.loginChanged
  //   .subscribe(userAuthenticated => {
  //     this.userAuthenticated = userAuthenticated;
  //   })
  // }

  constructor(private oidcSecurityService: OidcSecurityService) {}
  
  // ngOnInit(): void {
  //   this._authService.isAuthenticated()
  //   .then(userAuthenticated => {
  //     this.userAuthenticated = userAuthenticated;
  //   })
  // }

  ngOnInit() {
    // this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData}) => {
    //   this.userAuthenticated = isAuthenticated;
    //   this.user = userData;
    // });

    // if (!this.user) {
    //   this.oidcSecurityService.authorize();
    // }
  }
}
