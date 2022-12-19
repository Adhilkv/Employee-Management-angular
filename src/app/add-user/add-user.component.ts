import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatedUsers } from '../admin-panal/admin-panal.component';
import { AdminDataService } from '../service/data/admin-data.service';
import { BasicAuthenticationService } from '../service/http/basic-authentication.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  User: AuthenticatedUsers = <AuthenticatedUsers>{ };
  AuthenticatedUser : any = '';
  UserName: string = ''

  constructor(private router: Router,private adminDataService :AdminDataService,private route:ActivatedRoute,private basicAuthenticationService :BasicAuthenticationService)
  {
    
  }

  ngOnInit()
  {
    this.UserName = this.route.snapshot.params['username']
    this.AuthenticatedUser = this.basicAuthenticationService.getAuthenticatedUser()
    
    this.User = new AuthenticatedUsers(this.UserName,'','', '','',new Date() ,'USER')
    
    if (this.UserName != 'New') {
      this.adminDataService.retriveTodo(this.UserName).subscribe(data => this.User = data)
    }

  }

  saveTodo()
  {
    if (this.UserName === 'New') { 
    this.User.role ="USER";
     this.User.createdDate = new Date();
      this.adminDataService.createUser(this.User).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['AdminPanal'])
        },
        error =>
        {
         alert("Sorry, " + error.error.message)
          //console.log(error.error)
        }
      )
    }else
    {
      this.User.role ="USER";
      this.User.createdDate = new Date();
      this.adminDataService.UpdateUser(this.User).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['AdminPanal'])
        },
          error =>
          {
            alert("Sorry, " + error.error.message)
          }
      )
    }
  }

}
