import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserFilesComponent } from './user-files/user-files.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPanalComponent } from './admin-panal/admin-panal.component';
import { HttpIntercepterBasicAuthService } from './user/http-intercepter-basic-auth.service';
import { AddUserComponent } from './add-user/add-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MenuComponent,
    FooterComponent,
    UserFilesComponent,
    LogoutComponent,
    ErrorPageComponent,
    AdminLoginComponent,
    AdminPanalComponent,
    AddUserComponent,
    ChangePasswordComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass : HttpIntercepterBasicAuthService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
