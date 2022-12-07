import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { PublicKey } from '../models/public-key.model';
import { UserSignature } from '../models/user-signature.model';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  private userId: string;

  constructor(
    private httpClient: HttpClient,
    private oidcSecurityService: OidcSecurityService ) {
    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      this.userId = userData.sub;   
    });
  }

  addSignature(docId: string, docVersion: number) {
    return this.httpClient.post(`signatures/${this.userId}/${docId}/${docVersion}`, null);
  }

  getSignatures(docId: string, docVersion: number): Observable<UserSignature[]> {
    return this.httpClient.get<UserSignature[]>(`documents/${docId}/${docVersion}/keys`);
  }

  checkSignature(publicKey: PublicKey, docId: string, docVersion: number) {
    return this.httpClient.post(`signatures/${docId}/${docVersion}`, publicKey, { observe: 'response' });
  }
}
