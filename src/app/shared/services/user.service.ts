import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient) {
  }

  public getUser(id: string) : Observable<User> {
    return this.httpClient.get<User>(`users/${id}`);
  }

  public getAllUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(`users`);
  }

  public updateUser(user: User) {
    return this.httpClient.put(`users/${user.id}`, user);
  }
}
