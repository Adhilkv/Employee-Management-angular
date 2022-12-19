import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from '../service/data/admin-data.service';
import { BasicAuthenticationService } from '../service/http/basic-authentication.service';

export class AuthenticatedUsers {
  
  constructor(public userName: string,public firstName: string,public lastName: string,public password: string,public department: string,public createdDate: Date,public role: string) 
   { 

   }
}

@Component({
  selector: 'app-admin-panal',
  templateUrl: './admin-panal.component.html',
  styleUrls: ['./admin-panal.component.css']
})
export class AdminPanalComponent {
  
  AuthenticatedUserData : AuthenticatedUsers[] = []
  message:string = ''
  AuthenticatedUser : any = '';

  constructor(private adminDataService:AdminDataService , private basicAuthenticationService:BasicAuthenticationService,private router:Router)
  {}

  ngOnInit()
  {
    this.getData();
  }

  getData()
  {
    this.AuthenticatedUser = this.basicAuthenticationService.getAuthenticatedUser()
    this.adminDataService.retriveAllUsers(this.AuthenticatedUser).subscribe( response => {
    this.AuthenticatedUserData = response})
  }

  
  UpdateUser(userName : string)
  {
    this.router.navigate(['NewUser',userName]);
  }
  
  addUser()
  {
    this.router.navigate(['NewUser','New']);
  }

  deleteUser(userName : string)
  {
    this.adminDataService.deleteUser(userName).subscribe(response => {
      console.log(response);
      this.message = ' Deleted User';
      this.refreshList()})
    }
  

  refreshList()
  {
    this.adminDataService.retriveAllUsers(this.AuthenticatedUser).subscribe( response => {
    this.AuthenticatedUserData = response})
  }

  changePass(userName : string)
  {
    this.router.navigate(['update',userName]);
  }



}
