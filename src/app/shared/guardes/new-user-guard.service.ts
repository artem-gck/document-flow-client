import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NewUserGuard implements CanActivate {
  
  userId: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private oidcSecurityService: OidcSecurityService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      this.userId = userData.sub;   
    });

    let user = await this.userService.getUser(this.userId).toPromise();
    if (user?.name) {
        return true;
    }

    this.router.navigate(['/regisration']);
    return false;
  }
}
