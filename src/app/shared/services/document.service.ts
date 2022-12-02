import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { Doc } from '../models/doc.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private userId: string;

  constructor(private httpClient: HttpClient, private oidcSecurityService: OidcSecurityService) { 
    this.oidcSecurityService.checkAuth().subscribe(({ userData: userData }) => {
      this.userId = userData.sub;   
    });
  }

  public getDocsNames(): Observable<Doc[]> {
    return this.httpClient.get<Doc[]>(`document-names/users/${this.userId}`);
  }

  public getDocsNameById(id: string): Observable<Doc> {
    return this.httpClient.get<Doc>(`document-names/documents/${id}`);
  }

  public postDocument(file: File): Observable<string> {
    let formData = new FormData();
    formData.append('createrId', this.userId);
    formData.append('file', file);

    return this.httpClient.post<string>(`documents`, formData);
  } 

  public getDocument(id: string, version: number) {   
    return this.httpClient.get(`documents/${id}/${version}`, { observe: 'response', responseType: 'blob' });
  }

  public getLastDocsNames(count: number): Observable<Doc[]> {
    return this.httpClient.get<Doc[]>(`document-names/users/${this.userId}?count=${count}`);
  }
}
