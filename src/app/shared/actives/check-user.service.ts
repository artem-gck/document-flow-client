import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService implements CanActivate {
  userId: string;

  constructor(private userService: UserService, private oidcSecurityService: OidcSecurityService, private router: Router) {
    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      this.userId = userData.sub;   
    });
   }

   async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let userLocal: User | undefined;
    console.log(this.userId);

    userLocal = await this.userService.getUser(this.userId).toPromise();

    if (userLocal!.name == undefined)
      this.router.navigate(['/regisration']);

    return true;
  }
}
