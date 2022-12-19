import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/app.constants';
import { AuthenticatedUser } from 'src/app/user-files/user-files.component';

export const TOKEN = 'token';
export const AUTHENTICATED_USER =  'authenticaterUser';

@Injectable({
  providedIn: 'root'
})

export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeAuthenticationService(username: string, password: string) {
    console.log("username " + username)
    console.log("password " + password)
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticatedUser>(`${API_URL}/users/basicauth`, { headers }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
      )
    );
  }

  executeAdminAuthenticationService(username: string, password: string) {
    console.log("username " + username)
    console.log("password " + password)
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticatedUser>(`${API_URL}/admin/basicauth`, { headers }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
      )
    );
  }

  isUserLogedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user == null)
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) 
      return sessionStorage.getItem(TOKEN);
    return false;
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}
