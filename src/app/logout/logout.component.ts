import { Component } from '@angular/core';
import { BasicAuthenticationService } from '../service/http/basic-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(public basicAuthenticationService:BasicAuthenticationService )
  {

  }
  
  ngOnInit()
  {
    this.basicAuthenticationService.logout();
  }

}
