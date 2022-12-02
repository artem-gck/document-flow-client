import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('https://')) {

      const apiReq = req.clone({ url: `https://localhost:8080/gateway/${req.url}` });
      return next.handle(apiReq);
    }

    return next.handle(req);
  }
}
