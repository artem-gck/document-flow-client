import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();

  constructor(
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
    private userService: UserService
  ) { 
    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      this.user.id = userData.sub;   
    });
  }

  ngOnInit(): void {
  }

  async onRegistrationClick() {
    await this.userService.updateUser(this.user).toPromise();

    this.router.navigate(['/']);
  }
}
