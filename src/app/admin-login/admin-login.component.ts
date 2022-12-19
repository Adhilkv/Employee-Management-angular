import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/http/basic-authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  username = '';
  password = '';
  errorMessage = "Invalid Login"
  invalidLogin = false

  constructor(private basicAuthenticationService : BasicAuthenticationService,private router: Router)
  {

  }

  ngOnInit()
  {
    if(this.basicAuthenticationService.isUserLogedIn())
      this.basicAuthenticationService.logout();
  }


  handleBasicLogin()
  {
    this.basicAuthenticationService.executeAdminAuthenticationService(this.username,this.password).subscribe(data => {console.log(data);
    this.router.navigate(['AdminPanal']);
    this.invalidLogin=false}, error=>{console.log(error);this.invalidLogin=true})
  }


}
