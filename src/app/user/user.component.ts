import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {BasicAuthenticationService } from '../service/http/basic-authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

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
    this.basicAuthenticationService.executeAuthenticationService(this.username,this.password).subscribe(data => {console.log(data);
    this.router.navigate(['UserPanal']);
    this.invalidLogin=false}, error=>{console.log(error);this.invalidLogin=true})
    
  }
}
