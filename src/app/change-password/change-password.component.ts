import { Component } from '@angular/core';
import { AdminDataService } from '../service/data/admin-data.service';
import { AuthenticatedUsers } from '../admin-panal/admin-panal.component';
import { BasicAuthenticationService } from '../service/http/basic-authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {


  User: AuthenticatedUsers = <AuthenticatedUsers>{};
  AuthenticatedUser : any = '';
  UserName: string = ''

  constructor(private route: ActivatedRoute,private adminDataService: AdminDataService,private basicAuthenticationService :BasicAuthenticationService,private router:Router) { }


  ngOnInit() {
    this.UserName = this.route.snapshot.params['username']
    this.AuthenticatedUser = this.basicAuthenticationService.getAuthenticatedUser()
    this.User = new AuthenticatedUsers(this.UserName, '', '', '', '', new Date(), 'USER')
  }

  password()
  {
    this.adminDataService.ChangeUserPass(this.User).subscribe(
      data =>{
        console.log(data);
        this.router.navigate(['AdminPanal'])
      },
      err=>{
        alert("Sorry, Update Failed")
      }
    )
  }


}
