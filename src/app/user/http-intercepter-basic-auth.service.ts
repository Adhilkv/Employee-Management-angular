import { HttpInterceptor,HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../service/http/basic-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService : BasicAuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    let basicAuthHeaderUser = this.basicAuthenticationService.getAuthenticatedToken();

    if(basicAuthHeaderString && basicAuthHeaderUser) 
    {
      request = request.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString,
          'authenticaterUser':this.basicAuthenticationService.getAuthenticatedUser()!
          }
        }) 
  
    }

 
    return next.handle(request)
  }
}
