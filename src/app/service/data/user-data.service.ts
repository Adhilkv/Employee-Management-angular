import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedUser } from 'src/app/user-files/user-files.component';
import { API_URL } from 'src/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }


  retriveUser()
  {
    return this.http.get<AuthenticatedUser>(`${API_URL}/users/login`);
  }
}
