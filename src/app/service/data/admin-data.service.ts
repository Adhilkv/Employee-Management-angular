import { Injectable } from '@angular/core';
import { API_URL } from 'src/app.constants';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedUsers } from 'src/app/admin-panal/admin-panal.component';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  constructor(private http:HttpClient) { }
  
  retriveAllUsers(username:string)
  {
    return this.http.get<AuthenticatedUsers[]>(`${API_URL}/admin/all`);
  }

  createUser(User :AuthenticatedUsers)
  {
    console.log("User " + User);
    return this.http.post(`${API_URL}/admin/add`,User);
  }

  UpdateUser(User :AuthenticatedUsers)
  {
    console.log("User " + User);
    return this.http.post(`${API_URL}/admin/update`,User);
  }

  deleteUser(username:string)
  {
    return this.http.delete(`${API_URL}/admin/delete/${username}`)
  }

  retriveTodo(userName : string)
  {
    return this.http.get<AuthenticatedUsers>(`${API_URL}/admin/login/${userName}`);
  }

  ChangeUserPass(User :AuthenticatedUsers)
  {
    return this.http.post(`${API_URL}/admin/update/password`,User);
  }


}
