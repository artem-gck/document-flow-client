import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  constructor(private oidcSecurityService: OidcSecurityService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let access_token;

    this.oidcSecurityService.getAccessToken().subscribe((token) => access_token = token);

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`
        // Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkY0Q0IyNjIwQUJENjM4QkI1QThFRTAxNzAwNTc0RDBCIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NjkzNzU0NzcsImV4cCI6MTY2OTM3OTA3NywiaXNzIjoiaHR0cHM6Ly9zdHMuc2tvcnViYS5sb2NhbCIsImF1ZCI6WyJkb2N1bWVudF9hcGkiLCJ1c2VyaW5mb19hcGkiLCJnYXRld2F5Il0sImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzdWIiOiIyNjYzYTllZS1hOTRhLTQyZDEtYmI0Ni02YTk3N2UxMjA4NDQiLCJhdXRoX3RpbWUiOjE2NjkzNjMzNTgsImlkcCI6ImxvY2FsIiwibmFtZSI6InF3ZSIsImp0aSI6IjI2RjlBQTYyRDUxQjc4Q0JGQjlFQ0VCREFBNjgyOTlBIiwic2lkIjoiQjU3QzkxRkNDOTVENkI0QjMxNUUwNENCMDhGNEMyRkUiLCJpYXQiOjE2NjkzNzU0NzcsInNjb3BlIjpbImdhdGV3YXkiLCJhbmd1bGFyIiwiZG9jdW1lbnRfYXBpIiwicHJvZmlsZSIsIm9wZW5pZCIsInVzZXJpbmZvX2FwaSJdLCJhbXIiOlsicHdkIl19.fi8P-2T4X4GvMqNM6Z1wEw29MvHad87ULAw0lQffQAs4beHTyk--C41-yhmQWcXThbd5ou3sypqnC133h1kZsqVnHZJyw8RzG6ax1-iTF5D9lguEA2kRU71TEtRPnrwEZ2Q8KnkdCtD13ioLRNMQ3Jf9W68bOIAVWfDkaVeBP7z0dEpanL6YzrnOjIOdjM9qDC1zRmEIQ7LUEZsjinYOjKxM_3c6p7JGONYS6f8e0O5tM96s6HgTBzFij5o-9biLsaTLU4YADQ7IXOpEwM9ThajHouvY3bjYyrAU0IP2wXomnfVmUN-fkS3ISZ7oGZgm-ftHrN6zKgoOHtW970a_LA`
      }
    })

    return next.handle(authReq);
  }
}
